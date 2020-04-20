const express = require("express");

const server = express();

const session = require("express-session");

const authenticator = require("./data/authenticator");

const sessionConfig = {
  name: "name for my cookie",
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 60 * 10, //good for 10 min,
    secure: process.env.USE_SECURE_COOKIES || false, // used over https only, set to true in production
    httpOnly: true, // true means JS on the client cannot access the cookie
  },
};

server.use(express.json());
server.use(session(sessionConfig));

const usersRouter = require("./data/users-router");
const authRouter = require("./data/auth-router");

server.use("/api/users", authenticator, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  console.log("server is up and running");
  res.json({ server: "up" });
});

module.exports = server;
