from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
import json

# Dictionary to store user scores
user_scores = {}

# Function to start the bot and display the "Play Game" button
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = update.effective_user.id

    # Check if the user has a saved score and send it to the web app
    if user_id in user_scores:
        saved_data = json.dumps(user_scores[user_id])
        await update.message.reply_text(
            f"Welcome back! Your score is {user_scores[user_id]['score']}.",
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("Play Game", web_app={"url": "https://aakashkoirala17.github.io/climbgame/"})]
            ])
        )
        # Send the saved score to the web app when the user reopens the game
        await update.message.reply_text(f"WEB_APP_DATA:{saved_data}")
    else:
        await update.message.reply_text(
            "Welcome to the Mountain Climb Game! Tap the button below to start.",
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("Play Game", web_app={"url": "https://aakashkoirala17.github.io/climbgame/"})]
            ])
        )

# Function to handle data received from the web app (score updates)
async def handle_webapp_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = update.effective_user.id
    received_data = update.effective_message.web_app_data.data
    data = json.loads(received_data)

    # Update the user's score and level in the dictionary
    user_scores[user_id] = {
        "score": data["score"],
        "currentLevel": data["currentLevel"]
    }

    await update.message.reply_text(f"Data saved! Current score: {data['score']}")

def main() -> None:
    application = ApplicationBuilder().token("7389254359:AAFxuw-N-YpLqZm2L7gdllO8eitAaUEIIKw").build()

    # Command handler to start the game
    application.add_handler(CommandHandler("start", start))
    
    # Message handler to receive web app data
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_webapp_data))

    # Start the bot
    application.run_polling()

if __name__ == '__main__':
    main()
