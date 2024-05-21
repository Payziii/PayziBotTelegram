// Импортирование необходимых зависимостей и файлов
import * as os from 'os';

// Создание команды
export async function execute(bot: any, ctx: any) {

    ctx.reply(`ОЗУ: \`${(process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(0)} МБ\`/\`${(os.totalmem() / (1024 * 1024)).toFixed(0)} МБ\`\nЦП: \`${os.cpus()[0].model}\``)

}

let data = {
    command: "stats",
    description: "информация о боте",
    hide: false,
    active: true
}

export { data }