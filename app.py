from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
import json

# Function to start the bot and display the "Play Game" button
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Welcome to the Mountain Climb Game! Tap the button below to start.",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("Play Game", web_app={"url": "https://aakashkoirala17.github.io/climbgame/"})]
        ])
    )

# Function to handle data received from the web app
async def handle_webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    received_data = update.effective_message.web_app_data.data
    data = json.loads(received_data)

    message = data.get("message")
    score = data.get("score")

    await update.message.reply_text(f"Data received from web app: {message} with score {score}")

def main() -> None:
    application = ApplicationBuilder().token("7416393089:AAFKnvQSpPlrCU92JAo8vu7Zr6Pgdzj1gl0").build()

    # Command handler to start the game
    application.add_handler(CommandHandler("start", start))
    
    # Message handler to receive web app data
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_webapp_data))

    # Start the bot
    application.run_polling()

if __name__ == '__main__':
    main()
