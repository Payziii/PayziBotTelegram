// Импортирование необходимых зависимостей и файлов
import 'dotenv/config';
import { Bot, session, Context } from "grammy";
import {
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import setupCommands from './cmds/index.js';

// Создание бота
type MyContext = Context & ConversationFlavor;
const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

// Подключение зависимостей
bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

// Установка команд
setupCommands(bot);

// Запуск бота
bot.start();
