// Импортирование необходимых зависимостей и файлов
import 'dotenv/config';
import { Bot, session, Context } from "grammy";
import {
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";

// Создание бота
type MyContext = Context & ConversationFlavor;
const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

// Подключение зависимостей
bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

// Создание команды /start
bot.command("start", async (ctx) => {
  ctx.reply(`Добро пожаловать!`);
});

// Запуск бота
bot.start();
