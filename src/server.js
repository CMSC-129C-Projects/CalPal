import sirv from "sirv";
import polka from "polka";
import redirect from "@polka/redirect";
import compression from "compression";
import * as sapper from "@sapper/server";
import session from "express-session";
import { json } from "body-parser";
import { createServer } from "https";
import { readFileSync } from "fs";

const { PORT, NODE_ENV, GOOGLE_OAUTH2_CLIENT_ID, SESSION_SECRET } = process.env;
const dev = NODE_ENV === "development";

const server = polka()
  .use(
    session({
      secret: SESSION_SECRET,
      httpOnly: true,
      secure: true,
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
        access_token: req.session.access_token,
        GOOGLE_OAUTH2_CLIENT_ID,
      }),
    })
  );

const redirectServer = polka().get("*", (req, res) => {
  redirect(res, `https://${req.headers.host}${req.url}`);
});

if (dev) {
  server.listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
} else {
  const httpPort = 80;
  const sslPort = 443;
  const options = {
    key: readFileSync("/etc/letsencrypt/live/calpal.upcebu.edu.ph/privkey.pem"),
    cert: readFileSync(
      "/etc/letsencrypt/live/calpal.upcebu.edu.ph/fullchain.pem"
    ),
  };

  redirectServer.listen(httpPort, (err) => {
    console.error(err);
  });
  createServer(options, server.handler).listen(sslPort, (_) => {
    console.log(`> Running on https://localhost:${sslPort}`);
  });
}
