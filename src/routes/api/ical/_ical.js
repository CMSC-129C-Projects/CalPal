const ical = require("node-ical");

export async function getCardsFromUrl(calendarUrl) {
  const events = await ical.async.fromURL(calendarUrl);
  const cardsFromEvents = Object.entries(events).map(([_, e]) => {
    return {
      _id: e.uid,
      card_name: "",
      original_title: e.summary,
      original_calendar: calendarUrl,
      original_date: e.start,
      date_created: new Date(Date.now()),
      due_date_time: "",
      remind_date_time: "",
      description: e.description,
      color: "#ffffff",
    };
  });

  return cardsFromEvents;
}
