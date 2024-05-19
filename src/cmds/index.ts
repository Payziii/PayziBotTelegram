export default async function setupCommands(bot: any) {

    bot.command("start", async (ctx) => {
        ctx.reply(`Добро пожаловать! Список команд:\n\n- /weather - погода в определенном городе\n- /ask - нейросеть`);
    });

    bot.command("weather", async (ctx) => {
        await ctx.conversation.enter("weather");
    });

    bot.command("ask", async (ctx) => {
        await ctx.conversation.enter("ask");
    });
}