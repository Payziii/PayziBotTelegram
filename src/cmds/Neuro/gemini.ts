// Импортирование необходимых зависимостей и файлов
import { Context, InlineKeyboard } from "grammy";
import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";
import run from "../../func/gemini.js";

// Создание типов данных
type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

// Создание команды
export async function execute(conversation: MyConversation, ctx: MyContext) {
    let msg = await ctx.reply("Введите ваш запрос");
    const answer: any = await conversation.waitFrom(ctx.from);
    const neuro = await conversation.external(() => run(answer.message.text))
    ctx.api.sendMessage(msg.chat.id, neuro, { reply_to_message_id: answer.message.message_id})
}

let data = {
    command: "ask",
    description: "задать вопрос нейросети",
    hide: false,
    active: true
}

export { data }