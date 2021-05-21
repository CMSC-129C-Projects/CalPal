// Endpoint query parameters:
//   set        0 or 1
//
// When `set` is 1, `session.did_cards_load` will be set to `true`,
// and `false` if otherwise.
export async function post(req, res) {
  if (typeof req.query.set === "undefined") {
    throw new Error("'set' query parameter was not set");
  }

  const zeroOneToBool = (zeroOrOne) => {
    if (zeroOrOne !== "0" && zeroOrOne !== "1") {
      throw new Error("'set' query parameter must be '1' or '0'");
    }

    if (zeroOrOne === "1") {
      return true;
    } else if (zeroOrOne === "0") {
      return false;
    }
  };

  console.debug("/cards/did-cards-load");
  console.debug(zeroOneToBool(req.query.set));

  req.session.did_cards_load = zeroOneToBool(req.query.set);
  res.end();
}
