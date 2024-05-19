// Импортирование необходимых зависимостей и файлов
import { Context } from "grammy";
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
    await ctx.reply("Введите модель: gpt, gpt4, gemini");
    const model: any = await conversation.wait();
    if(['gpt', 'gpt4', 'gemini'].includes(model.message.text.toLowerCase()) === false) return ctx.reply("Модель указана неверно");
    await ctx.reply("Введите ваш запрос");
    const answer: any = await conversation.wait();
    const text: any = await ask(model.message.text, answer.message.text);
    ctx.reply(text);
}

let data = {
    command: "ask",
    description: "задать вопрос нейросети",
    hide: false,
    active: true
}

export { data }