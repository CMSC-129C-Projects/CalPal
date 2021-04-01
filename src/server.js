import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import session from "express-session";
import { json } from "body-parser";

const { PORT, NODE_ENV } = process.env;
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
    json(),
    sapper.middleware({
      session: (req, res) => ({
        user_id: req.session.user_id,
        cards: req.session.cards,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
