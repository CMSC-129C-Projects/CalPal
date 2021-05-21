import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import session from "express-session";
import { json } from "body-parser";

const { PORT, NODE_ENV, GOOGLE_OAUTH2_CLIENT_ID } = process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
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
        GOOGLE_OAUTH2_CLIENT_ID,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
