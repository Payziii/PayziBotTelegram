// Импортирование необходимых зависимостей и файлов
import { Context } from "grammy";
import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";
import getCurrent from '../../func/getWeather.js';

// Создание типов данных
type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

// Создание команды
export async function execute(conversation: MyConversation, ctx: MyContext) {
    await ctx.reply("Введите название города:");
    const answer = await conversation.wait();
    const city = answer.message.text;
    const data = await getCurrent(city);

    if (data.error) {
        if (data.error.code == 1006) return ctx.reply("Такой город не найден");
        return ctx.reply("Ошибка при получении данных:\n\n" + data.error.message);
    }

    ctx.reply(`${data.location.name}, ${data.location.country}\n${data.current.condition.text}\n\nТекущая погода:\nТемпература: ${<string>data.current.temp_c}°C\nОщущается как: ${<string>data.current.feelslike_c}°C\nВлажность: ${<string>data.current.humidity}%\nВетер: ${<string><unknown>(data.current.wind_kph / 3.6).toFixed(1)} м/c`)
}

let data = {
    command: "weather",
    description: "погода в определенном городе",
    hide: false,
    active: true
}

export { data }