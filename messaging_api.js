const axios = require("axios");
const websocket = require("ws");

createMessagingSocket = () => {
  return new websocket("ws://localhost:3001/messages");
};

getMessages = () => {
  return axios
    .get("http://localhost:3001/messages")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

sendMessage = (message) => {
  return axios.post("http://localhost:3001/messages", message);
};

module.exports.createMessagingSocket = createMessagingSocket;
module.exports.getMessages = getMessages;
module.exports.sendMessage = sendMessage;
