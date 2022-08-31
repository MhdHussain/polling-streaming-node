const helpers = require("./helpers");
const messagingApi = require("./messaging_api");
const readline = require("readline");

const displayedMessages = {};

const terminal = readline.createInterface({
  input: process.stdin,
});

terminal.on("line", (text) => {
  const username = process.env.NAME;
  const id = helpers.getRandomInt(10000);
  displayedMessages[id] = true;

  const message = { id, text, username };

  messagingApi.sendMessage(message);
});

displayMessage = (message) => {
  console.log(`> ${message.username}: ${message.text}`);
  displayedMessages[message.id] = true;
};

getAndDisplayMessages = async () => {
  const messages = await messagingApi.getMessages();

  for (const message of messages) {
    const messageAlreadyDisplayed = message.id in displayedMessages;
    if (!messageAlreadyDisplayed) displayMessage(message);
  }
};

//! THE POLL STRATEGY
pollMessages = () => {
  setInterval(getAndDisplayMessages, 10000);
};

//? THE STREAMING STRATEGY
streamMessages = () => {
  const messagingSocket = messagingApi.createMessagingSocket();

  messagingSocket.on("message", (data) => {
    const message = JSON.parse(data);
    const messageAlreadyDisplayed = message.id in displayedMessages;
    if (!messageAlreadyDisplayed) displayMessage(message);
  });
};

if (process.env.MODE === "poll") {
  getAndDisplayMessages();
  pollMessages();
} else if (process.env.MODE === "stream") {
  getAndDisplayMessages();
  streamMessages();
}
