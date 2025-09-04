# Telegram Desktop Update Bot

A Google Apps Script bot that notifies you via Telegram when a new version of **Telegram Desktop** is released.

## Features

- Checks the latest Telegram Desktop version from [GitHub releases](https://github.com/telegramdesktop/tdesktop/releases/latest).
- Sends a Telegram message if a new version is available.
- Supports `/start` command for basic bot interaction.
- Automatic hourly version checking using Google Apps Script triggers.
- Webhook integration to respond to incoming messages.

## Setup

1. **Create a Telegram Bot**  
   - Talk to [@BotFather](https://t.me/BotFather) on Telegram and create a bot.
   - Save the **API token** provided by BotFather.

2. **Set Your Chat ID**  
   - You can get your Telegram chat ID by sending a message to your bot and checking the updates using:
     ```bash
     https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
     ```

3. **Google Apps Script Setup**  
   - Open [Google Apps Script](https://script.google.com/).
   - Create a new project and paste the script.
   - Update the following variables:
     ```javascript
     var apiToken = "YOUR_TELEGRAM_BOT_TOKEN"; // Telegram bot token
     var chatId = "YOUR_CHAT_ID"; // your Telegram ID
     var appUrl = "YOUR_DEPLOYED_WEB_APP_URL"; // Web app URL after deployment
     ```
   - Deploy as a **Web App**:
     - Click **Deploy → New Deployment → Web app**
     - Set **Execute as**: Me
     - Set **Who has access**: Anyone
     - Copy the Web App URL and update `appUrl` in the script.

4. **Set Webhook**  
   - Run the `setWebhook()` function in Apps Script to link your bot to the deployed web app.

5. **Create Hourly Trigger**  
   - Run the `createHourlyTrigger()` function to automatically check for new Telegram Desktop versions every hour.

## Functions Overview

| Function | Description |
|----------|-------------|
| `checkTelegramUpdate()` | Checks GitHub for the latest Telegram Desktop release and sends a message if there is a new version. |
| `sendMessage(chatId, text)` | Sends a Telegram message to a specific chat. |
| `doPost(e)` | Handles incoming webhook messages (e.g., `/start` command). |
| `createHourlyTrigger()` | Creates a trigger to check for updates hourly. |
| `deleteTriggers()` | Deletes existing triggers to avoid duplicates. |
| `setWebhook()` | Sets the webhook for Telegram bot updates. |

## Notes

- Make sure your bot has **permissions** to send messages to your chat.
- The bot uses Google Apps Script **PropertiesService** to store the last known version to avoid repeated notifications.

## License

This project is licensed under the MIT License.  

