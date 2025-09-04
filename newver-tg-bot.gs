var apiToken = "token"; // Telegram bot token
var chatId = "chat-id"; // your Telegram ID
var apiUrl = "https://api.telegram.org/bot" + apiToken;
var lastVersionKey = "LAST_VERSION"; // Key for PropertiesService to store last known version
var appUrl = "url app script";

/**
 * Check the latest Telegram Desktop version from GitHub
 * and send a Telegram message if a new version is available.
 */
function checkTelegramUpdate() {
  try {
    var response = UrlFetchApp.fetch("https://api.github.com/repos/telegramdesktop/tdesktop/releases/latest");
    var data = JSON.parse(response.getContentText());
    var latestVersion = data.tag_name; // e.g., "v1.9.4"

    var scriptProperties = PropertiesService.getScriptProperties();
    var lastVersion = scriptProperties.getProperty(lastVersionKey);

    if (lastVersion !== latestVersion) {
      sendMessage(chatId, `🚀 New Telegram Desktop version available: ${latestVersion}\nhttps://github.com/telegramdesktop/tdesktop/releases/latest`);
      scriptProperties.setProperty(lastVersionKey, latestVersion);
    }
  } catch (e) {
    Logger.log("Error in checkTelegramUpdate: " + e.message);
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var chatId = data.message.chat.id;
    var text = data.message.text;

    if (text === "/start") {
      sendMessage(chatId, "Hello! I am a Telegram Desktop update bot. I will notify you when a new version is released.");
    }
  } catch (error) {
    Logger.log("Error: " + error.message);
  }
}

/**
 * Send a message to the user via Telegram
 */
function sendMessage(chatId, text) {
  var url = apiUrl + "/sendMessage?chat_id=" + chatId + "&text=" + encodeURIComponent(text);
  UrlFetchApp.fetch(url);
}

/**
 * Create an hourly trigger for automatic version checking
 * Ensures that only one trigger exists at a time
 */
function createHourlyTrigger() {
  // Remove existing triggers for this function
  deleteTriggers();

  // Create a new hourly trigger
  ScriptApp.newTrigger("checkTelegramUpdate")
    .timeBased()
    .everyHours(1)
    .create();
}

/**
 * Delete all triggers associated with the checkTelegramUpdate function
 */
function deleteTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === "checkTelegramUpdate") {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

// Set the Webhook URL for the bot
function setWebhook() {
  var url = apiUrl + "/setWebhook?url=" + appUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}
