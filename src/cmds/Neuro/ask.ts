// Импортирование необходимых зависимостей и файлов
import { Context } from "grammy";
import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";
import ask from "../../func/rsnchat";

// Создание типов данных
type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

// Создание команды
export async function execute(conversation: MyConversation, ctx: MyContext) {

}

let data = {
    command: "ask",
    description: "задать вопрос нейросети",
    hide: false,
    active: true
}

export { data }