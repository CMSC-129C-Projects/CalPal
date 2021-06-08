import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import session from "express-session";
import { json } from "body-parser";

const { createServer } = require("https");
const { readFileSync } = require("fs");

const { PORT, NODE_ENV, GOOGLE_OAUTH2_CLIENT_ID } = process.env;
const dev = NODE_ENV === "development";

const server = polka() // You can also use Express
  .use(
    session({
      secret: "SuperSecretShouldNotBeCommitted",
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000,
      },
    })
  )
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    json({ limit: "5mb" }),
    sapper.middleware({
      session: (req, _res) => ({
        did_cards_load: req.session.did_cards_load,
        user_id: req.session.user_id,
        lists: req.session.lists,
        archived_cards: req.session.archived_cards,
        calendars: req.session.calendars,
        GOOGLE_OAUTH2_CLIENT_ID,
      }),
    })
  );

if (dev) {
  server.listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
} else {
  const sslPort = 443;
  const options = {
    key: readFileSync("/etc/letsencrypt/live/calpal.upcebu.edu.ph/privkey.pem"),
    cert: readFileSync(
      "/etc/letsencrypt/live/calpal.upcebu.edu.ph/fullchain.pem"
    ),
  };

  createServer(options, server.handler).listen(PORT, (_) => {
    console.log(`> Running on https://localhost:${sslPort}`);
  });
}
