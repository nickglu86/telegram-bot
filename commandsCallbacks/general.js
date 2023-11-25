// Say Hello
const sayHello = (msg, bot) => {
      const chatId = msg.chat.id;
      const username = msg.from.username;
    
      if (username) {
        bot.sendMessage(chatId, `Hi, @${username}!`);
      } else {
        bot.sendMessage(chatId, "Hi there!");
      }
}
// Show Chat Group Id
const showChatId = (msg, bot) => {
  bot.sendMessage(msg.chat.id, "Chat Id: " + msg.chat.id);
  console.log("Group Chat ID:", msg.chat.id);
};

// Check if the user is an admin
const isAdmin = (msg, bot) => {
  try {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const isAdmin =
      msg.chat.all_members_are_administrators ||
      msg.chat.admins.some((admin) => admin.user.id === userId);
    if (isAdmin) {
      bot.sendMessage(chatId, "Hi Admin!");
    } else {
      bot.sendMessage(chatId, "You need to be an admin to use this command.");
    }
  } catch (error) {
    bot.sendMessage(chatId, "Error checking if you are Admin.");
  }
};

module.exports = { sayHello, showChatId, isAdmin};
