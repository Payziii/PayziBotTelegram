// Импортирование необходимых зависимостей и файлов
import { Context } from "grammy";
import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";
import gpt4 from "../../func/freejourney.js";

// Создание типов данных
type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

// Создание команды
export async function execute(conversation: MyConversation, ctx: MyContext) {
    await ctx.reply("Введите ваш запрос");
    const answer: any = await conversation.wait();
    gpt4(answer.message.text).then((data) => {
        let answer = data.data.completion;
        if (answer.length > 4000) {
            let mess = answer;
            mess = mess.substring(0, 3997);
            mess = mess + "...";
            return ctx.reply(mess);
        } else {
            ctx.reply(answer);
        }
    })
}

let data = {
    command: "gpt4",
    description: "задать вопрос ChatGPT-4",
    hide: false,
    active: true
}

export { data }