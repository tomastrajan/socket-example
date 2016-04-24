import http from "http";

import express from "express";
import socketIo from "socket.io";
import bodyParser from "body-parser";

import connectionHandler from "./connection-handler";

const app = express();
const server = http.Server(app);
const io = socketIo(server);

const ENV = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static("dist"));

io.on("connection", connectionHandler);

server.listen(PORT, () => console.log(`Listening on *:${PORT}, env: ${ENV}`));

