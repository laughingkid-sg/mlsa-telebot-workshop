// SS
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env['BOT_TOKEN'])

bot.start( async (ctx) => {
    ctx.reply('Hey ' + ctx.update.message.from.first_name + "!") 
})

bot.on('message', async (ctx) => {
    ctx.reply('You said ' + ctx.update.message.text);
})

bot.launch()