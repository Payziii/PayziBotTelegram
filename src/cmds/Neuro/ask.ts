// Импортирование необходимых зависимостей и файлов
import { Context, InlineKeyboard } from "grammy";
import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";
import ask from "../../func/rsnchat.js";

// Создание типов данных
type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

// Создание команды
export async function execute(conversation: MyConversation, ctx: MyContext) {
    const keyboard = new InlineKeyboard()
    .text(`GPT-4`, `gpt4`).text(`Gemini`, `gemini`)
    await ctx.reply("Выберите модель", { reply_markup: keyboard });

    const response = await conversation.waitForCallbackQuery(["gpt4", "gemini"], {
        otherwise: (ctx) => ctx.reply("Модель указана неверно"),
      });

    await ctx.reply("Введите ваш запрос");
    const answer: any = await conversation.wait();
    const neuro = await conversation.external(() => ask(response.match, answer.message.text))
    ctx.reply(neuro)
}

let data = {
    command: "ask",
    description: "задать вопрос нейросети",
    hide: false,
    active: true
}

export { data }