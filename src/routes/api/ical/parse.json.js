import { getCardsFromUrl, getCardsFromGoogleCalendarId } from "./_ical.js";

export async function get(req, res, next) {
  // TODO: Make this feel less like a hack.
  //
  //       The way this works is that when Sapper receives a
  //       request with a `encodeURIComponent()`-ed URL, it stops
  //       at the first `&`, and considers whatever is after as
  //       additional query parameters.
  //
  //       In other words, the `%26` that shows up in the URL
  //       gets interpreted by Sapper as an `&`, which means that
  //       it is considered to be a different query parameter.
  //
  //       This doesn't work for our purposes because we need
  //       to send the query parameters of the original URL to
  //       `getCardsFromUrl()`.
  //
  //       For now, we hackishly put the rest of the `query` back
  //       together with the calendar URL.
  let calendarSrc = req.query.src;
  for (const [key, value] of Object.entries(req.query).slice(1)) {
    calendarSrc += `&${key}=${value}`;
  }
  console.debug(`[/api/ical/parse.json] calendarSrc: ${calendarSrc}`);

  const iCalUrlRegex = /^http/i;
  const isGoogleCalendarId = !iCalUrlRegex.test(calendarSrc);

  let cards;
  if (isGoogleCalendarId) {
    cards = await getCardsFromGoogleCalendarId(
      calendarSrc,
      req.session.access_token
    );
  } else {
    cards = await getCardsFromUrl(calendarSrc);
  }

  if (cards !== null) {
    res.writeHead(200, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.end(JSON.stringify(cards));
  } else {
    console.error(`Could not get cards from ${calendarSrc}`);
    next();
  }
}
