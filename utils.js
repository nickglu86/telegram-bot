require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");

// Create and Init TelgramBot Instance
const createNewTelegramBot = () => {
  const TelegramBot = require("node-telegram-bot-api");
  const token = process.env.TELEGRAM_TOKEN;
  const newBot = new TelegramBot(token, { polling: true });
  return newBot;
};

// Function to scrape news from the website
const scrapeNews = async () => {
  const url = "https://www.disclose.tv/";
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const newsHeadlines = [];

    // Replace this selector with the appropriate one for the structure of the website
    $("article.article").each((index, element) => {
      const headline = $(element).find("h3.title a").text().trim();
      const link = $(element).find("h3.title a").attr("href");
      newsHeadlines.push({ headline, link });
    });

    return newsHeadlines;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Function to post news to the Telegram group
const postNews =  async (chatId, bot) => {
  console.log("bot" + { bot });

  const news = await scrapeNews();
  let message = "**LATEST NEWS** \n";
  if (news.length > 0) {
    news.forEach((item) => {
      message += `\n - ${item.headline}`;
    });
  } else {
    bot.sendMessage(chatId, "Error fetching news. Please try again later.");
  }
  //bot.sendMessage(chatId, message);
  bot.sendMessage(chatId, message);
}

module.exports = { createNewTelegramBot, postNews, scrapeNews };
