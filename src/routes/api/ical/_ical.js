const fetch = require("node-fetch");
const ical = require("node-ical");
const { google } = require("googleapis");

const { GOOGLE_OAUTH2_CLIENT_ID, GOOGLE_OAUTH2_CLIENT_SECRET } = process.env;

export async function getCardsFromUrl(calendarSrc) {
  try {
    // NOTE: We check first if `calendarSrc` is actually an iCal URL, and
    //       not just a regular website. This means that we have to fetch
    //       once to check if its `Content-Type` is `text/calendar`. Then,
    //       we fetch again to actually parse the iCal data.
    //       There doesn't seem to be a way to do this in one go, but it
    //       works for now.
    const res = await fetch(calendarSrc, {
      method: "HEAD",
    });
    if (!res.ok) {
      throw new Error("Could not parse iCal URL");
    }
    if (!res.headers.get("Content-Type").includes("text/calendar")) {
      throw new Error("The URL is not an iCal URL");
    }

    const events = await ical.async.fromURL(calendarSrc);
    const cardsFromEvents = Object.entries(events)
      .map(([_, e]) => {
        if (!e.uid) {
          return null;
        }

        if (new Date(e.start) < new Date(Date.now())) {
          return null;
        }

        return {
          _id: e.uid,
          card_name: e.summary,
          original_title: e.summary,
          original_calendar: calendarSrc,
          original_date: e.start,
          date_created: new Date(Date.now()),
          due_date_time: "",
          remind_date_time: "",
          description: e.description,
          color: "#ffffff",
        };
      })
      .filter((c) => !!c);

    return cardsFromEvents;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getCardsFromGoogleCalendarId(calendarSrc, accessToken) {
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_OAUTH2_CLIENT_ID,
    GOOGLE_OAUTH2_CLIENT_SECRET
  );
  oAuth2Client.setCredentials({
    access_token: accessToken,
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oAuth2Client,
  });

  try {
    const res = await calendar.events.list({
      calendarId: calendarSrc,
      timeMin: new Date(Date.now()),
    });
    const cardsFromEvents = Object.entries(res.data.items)
      .map(([_, e]) => {
        if (!e.id) {
          return null;
        }

        let startDate;
        if (e.start.date != null) {
          startDate = new Date(e.start.date);
        } else if (e.start.dateTime) {
          startDate = new Date(e.start.dateTime);
        }

        return {
          _id: e.id,
          card_name: e.summary,
          original_title: e.summary,
          original_calendar: calendarSrc,
          original_date: startDate,
          date_created: new Date(Date.now()),
          due_date_time: "",
          remind_date_time: "",
          description: e.description,
          color: "#ffffff",
        };
      })
      .filter((e) => !!e);

    return cardsFromEvents;
  } catch (err) {
    console.error(err);
    return null;
  }
}
