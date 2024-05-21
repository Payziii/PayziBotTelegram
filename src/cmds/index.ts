import * as stats from './Main/stats.js';

export default async function setupCommands(bot: any) {

    bot.command("start", async (ctx: any) => {
        ctx.reply(`Добро пожаловать! Список команд:\n\n- /weather - погода в определенном городе\n- /ask - нейросеть`);
    });

    bot.command("weather", async (ctx: any) => {
        await ctx.conversation.enter("weather");
    });

    bot.command("ask", async (ctx: any) => {
        await ctx.conversation.enter("ask");
    });

    bot.command("stats", async (ctx: any) => {
        await stats.execute(bot, ctx);
    });
}