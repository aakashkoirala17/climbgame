from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Welcome to the Mountain Climb Game! Tap the button below to start.",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("Play Game", web_app={"url": "https://aakashkoirala17.github.io/climbgame/"})]
        ])
    )

def main() -> None:
    # Replace 'YOUR_BOT_TOKEN' with your actual bot token
    application = ApplicationBuilder().token("7416393089:AAFKnvQSpPlrCU92JAo8vu7Zr6Pgdzj1gl0").build()

    # Add the /start command handler
    application.add_handler(CommandHandler("start", start))

    # Start the bot
    application.run_polling()

if __name__ == '__main__':
    main()
