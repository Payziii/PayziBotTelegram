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

async function sendMessageInParts(ctx: MyContext, chatId: number, text: string, replyToMessageId?: number) {
    const MAX_LENGTH = 1999;
  
    if (text.length <= MAX_LENGTH) {
      await ctx.api.sendMessage(chatId, text, { reply_to_message_id: replyToMessageId });
      return;
    }
  
    for (let i = 0; i < text.length; i += MAX_LENGTH) {
      const part = text.substring(i, i + MAX_LENGTH);
      await ctx.api.sendMessage(chatId, part, { reply_to_message_id: replyToMessageId });
    }
  }

// Создание команды
export async function execute(conversation: MyConversation, ctx: MyContext) {
    let msg = await ctx.reply("Введите ваш запрос");
    const answer: any = await conversation.waitFrom(ctx.from);
    const neuro = await conversation.external(() => run(answer.message.text))
    await sendMessageInParts(ctx, msg.chat.id, neuro, answer.message.message_id);
}

let data = {
    command: "ask",
    description: "задать вопрос нейросети",
    hide: false,
    active: true
}

export { data }