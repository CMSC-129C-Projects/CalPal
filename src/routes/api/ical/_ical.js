const ical = require("node-ical");

export async function getCardsFromUrl(calendarUrl) {
  const events = await ical.async.fromURL(calendarUrl);
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
        original_calendar: calendarUrl,
        original_date: e.start,
        date_created: new Date(Date.now()),
        due_date_time: "",
        remind_date_time: "",
        description: e.description,
        color: "#ffffff",
      };
    })
    .filter((c) => c);

  return cardsFromEvents;
}
