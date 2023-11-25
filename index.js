
const { createNewTelegramBot } = require('./utils');
const { showChatId, isAdmin, sayHello} = require('./commandsCallbacks/general');
const { getLatestNews, getLatestArticle } = require('./commandsCallbacks/news');

const bot = createNewTelegramBot();

// Get Latest News
bot.onText(/\/latestNews/, (msg) => getLatestNews(msg, bot));

// Get Latest Article
bot.onText(/\/latestArticle/, (msg) => getLatestArticle(msg, bot));

//Say Hello
bot.onText(/\/Hello/, (msg) => sayHello(msg, bot));

// Show Chat Group Id
bot.onText(/\/showChatId/, (msg) => showChatId(msg, bot));

// Check if the user is an Admin
bot.onText(/\/isAdmin/, (msg) => isAdmin(msg, bot));
