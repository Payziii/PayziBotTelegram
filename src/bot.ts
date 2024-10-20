// Импортирование необходимых зависимостей и файлов
import 'dotenv/config';
import { Bot, session, Context, GrammyError, HttpError } from "grammy";
import {
  type ConversationFlavor
} from "@grammyjs/conversations";
import setupCommands from './cmds/index.js';
import setupConversations from './cmds/conversations.js';
import { setupDatabase } from './database/functions.js';

// Создание бота
type MyContext = Context & ConversationFlavor;
const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

// Подключение зависимостей
bot.use(session({ initial: () => ({}) }));

// Установка команд, диалогов и базы данных
setupConversations(bot).then(() => console.log("Диалоги установлены"));
setupCommands(bot).then(() => console.log("Команды установлены"));
setupDatabase(bot);

bot.catch((err) => {
  const ctx = err.ctx;
  console.log(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.log("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.log("Could not contact Telegram:", e);
  } else {
    console.log("Unknown error:", e);
  }
});

// Запуск бота
bot.start();
