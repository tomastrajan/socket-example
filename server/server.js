import http from "http";

import express from "express";
import bodyParser from "body-parser";

const app = express();
const server = http.Server(app);

const ENV = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static("dist"));

server.listen(PORT, () => console.log(`Listening on *:${PORT}, env: ${ENV}`));

