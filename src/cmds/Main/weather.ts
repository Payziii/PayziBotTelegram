// Импортирование необходимых зависимостей и файлов
import { Context, InlineKeyboard } from "grammy";
import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";
import { getCurrent, getForecast } from '../../func/getWeather.js';

const dayNames = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

// Создание типов данных
type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

// Создание команды
export async function execute(conversation: MyConversation, ctx: MyContext) {
    let msg1 = await ctx.reply("Введите название города:");
    const answer = await conversation.waitFrom(ctx.from);
    const city = answer.message.text;
    const data = await conversation.external(() => getCurrent(city))

    if (data.error) {
        if (data.error.code == 1006) return ctx.reply("Такой город не найден");
        return ctx.reply("Ошибка при получении данных:\n\n" + data.error.message);
    }

    const keyboard = new InlineKeyboard()
    .text(`Погода на 3 дня`, `forecast`)

    let msg = await ctx.reply(`[ ${data.location.name}, ${data.location.country} ]\n${data.current.condition.text}\n\nТекущая погода:\n• Температура: ${<string>data.current.temp_c}°C\n• Ощущается как: ${<string>data.current.feelslike_c}°C\n• Влажность: ${<string>data.current.humidity}%\n• Ветер: ${<string><unknown>(data.current.wind_kph / 3.6).toFixed(1)} м/c`, { reply_markup: keyboard });

    const response = await conversation.waitForCallbackQuery(["forecast"]);

    const forecast = await conversation.external(() => getForecast(city))
    const wea = forecast.forecast.forecastday;

    let day2s = dayNames[new Date(wea[2].date_epoch * 1000).getDay()];

    let day1: any = new Date(wea[0].date_epoch * 1000);
    day1 = day1.toLocaleDateString("ru-RU", {
          month: "2-digit",
          day: "2-digit",
        });
        let day2: any = new Date(wea[1].date_epoch * 1000);
        day2 = day2.toLocaleDateString("ru-RU", {
          month: "2-digit",
          day: "2-digit",
        });
        let day3: any = new Date(wea[2].date_epoch * 1000);
        day3 = day3.toLocaleDateString("ru-RU", {
          month: "2-digit",
          day: "2-digit",
        });

        let stringa = `https://quickchart.io/chart?c={type:%27line%27,data:{labels:[%27${day1}%2000:00%27,%2706:00%27,%2712:00%27,%2718:00%27,%27${day2}%2000:00%27,%2706:00%27,%2712:00%27,%2718:00%27,%27${day3}%2000:00%27,%2706:00%27,%2712:00%27,%2718:00%27],datasets:[{label:%27%D0%A2%D0%B5%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0%27,data:[${wea[0].hour[0].temp_c},${wea[0].hour[6].temp_c},${wea[0].hour[12].temp_c},${wea[0].hour[18].temp_c},${wea[1].hour[0].temp_c},${wea[1].hour[6].temp_c},${wea[1].hour[12].temp_c},${wea[1].hour[18].temp_c},${wea[2].hour[0].temp_c},${wea[2].hour[6].temp_c},${wea[2].hour[12].temp_c},${wea[2].hour[18].temp_c}],fill:true,borderColor%3A%27rgba%2863%2C+204%2C+101%2C+1%29%27%2CbackgroundColor%3A%27rgba%2863%2C+204%2C+101%2C+0.3%29%27%7D]}}`;

    ctx.api.deleteMessages(msg.chat.id, [msg.message_id, answer.message.message_id, msg1.message_id])
    ctx.replyWithPhoto(stringa, { caption: `[ ${data.location.name}, ${data.location.country} ]\n\nСегодня:\n>>> ${wea[0].day.condition.text}\n${wea[0].day.maxtemp_c}°C / ${wea[0].day.mintemp_c}°C\nЗавтра:\n>>> ${wea[1].day.condition.text}\n${wea[1].day.maxtemp_c}°C / ${wea[1].day.mintemp_c}°C\n${day2s}:\n>>> ${wea[2].day.condition.text}\n${wea[2].day.maxtemp_c}°C / ${wea[2].day.mintemp_c}°C`})
}

let data = {
    command: "weather",
    description: "погода в определенном городе",
    hide: false,
    active: true
}

export { data }