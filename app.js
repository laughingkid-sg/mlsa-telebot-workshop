// SS
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env['BOT_TOKEN'])

bot.start((ctx) => {
  ctx.reply('Hi.')
})

bot.command('status', async (ctx) => {
    ctx.reply('ok.');
})

bot.launch()