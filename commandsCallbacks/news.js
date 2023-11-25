const { postNews, scrapeNews } = require("../utils");

const getLatestNews = (msg, bot) => {
  const chatId = msg.chat.id;
  postNews(msg.chat.id, bot);
  bot.sendMessage(chatId, "Loading...");
};
 
const getLatestArticle = async (msg, bot)  => {
      const chatId = msg.chat.id;
      const news = await scrapeNews();
      try {
        bot.sendMessage(chatId, `\n - ${news[0].headline}\n - ${news[0].link}`);
      } catch (error) {
        bot.sendMessage(chatId, "Error fetching news. Please try again later.");
      }
}
module.exports = { getLatestNews, getLatestArticle };
