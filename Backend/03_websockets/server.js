const dotenv = require("dotenv");
dotenv.config();

const { WebSocketServer } = require("ws");
const http = require("http");
const { url } = require("inspector");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

wsServer.on("connection", (ws) => {
  console.log("websocket connection established");
  ws.send("Welcome! You are connected to the WebSocket server.");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`You sent: Server message`);

    if (message.toString() == "close") {
      ws.close(1000, "Closing connection as requested by client");
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
