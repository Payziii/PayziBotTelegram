export default async function setupCommands(bot: any) {

    bot.command("start", async (ctx) => {
        ctx.reply(`Добро пожаловать! Список команд:\n\n- /weather - погода в определенном городе`);
    });

}