// Импортирование необходимых зависимостей и файлов
import 'dotenv/config';
import { Bot, session, Context } from "grammy";
import {
  type ConversationFlavor
} from "@grammyjs/conversations";
import setupCommands from './cmds/index.js';
import setupConversations from './cmds/conversations.js';
import { setupDatabase } from './database/setup.js';

// Создание бота
type MyContext = Context & ConversationFlavor;
const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

// Подключение зависимостей
bot.use(session({ initial: () => ({}) }));

// Установка команд, диалогов и базы данных
setupConversations(bot).then(() => console.log("Диалоги установлены"));
setupCommands(bot).then(() => console.log("Команды установлены"));
setupDatabase(bot);

// Запуск бота
bot.start();
