import * as stats from './Main/stats.js';
import { getUser } from '../database/functions.js';

export default async function setupCommands(bot: any) {

    bot.command("start", async (ctx: any) => {
        getUser(ctx.from.id);
        ctx.reply(`Добро пожаловать! Список команд:\n\n- /weather - погода в определенном городе\n- /ask - нейросеть`);
    });

    bot.command("weather", async (ctx: any) => {
        await ctx.conversation.enter("weather");
    });

    bot.command("ask", async (ctx: any) => {
        await ctx.conversation.enter("ask");
    });

    bot.command("gemini", async (ctx: any) => {
        await ctx.conversation.enter("gemini");
    });

    bot.command("gpt4", async (ctx: any) => {
        await ctx.conversation.enter("gpt4");
    });

    bot.command("stats", async (ctx: any) => {
        await stats.execute(bot, ctx);
    });
}