const { Telegraf } = require("telegraf")
const azure = require("./azure")

const bot = new Telegraf(process.env["BOT_TOKEN"])

bot.start(async (ctx) => {
    ctx.reply("Hey " + ctx.update.message.from.first_name + "!")
})

bot.on("message", async (ctx) => {
    // ctx.reply("You said " + ctx.update.message.text)
    azure.textanalytic(ctx.update.message.text)
    ctx.reply(await azure.qnamaker(ctx.update.message.text))
})

bot.launch()

/*

Webhooks

// Setting the webhook URL
bot.telegram.setWebhook("URL")

// Starting the Bot
bot.startWebhook("/secret-path")

// Start the web server
require("http")
    .createServer(bot.webhookCallback("/secret-path"))
    .listen(8080)

*/