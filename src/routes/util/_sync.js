/**
 * Creates new cards from new iCal events.
 * @param session - The session variable. On the Svelte side, this should be `$session`.
 * @param fetch - The fetch function to use. In Sapper's `preload()`, this should be `this.fetch`.
 */
export async function syncCards(session, fetch) {
  if (session.calendars == null) {
    return;
  }

  let calendarFetches = [];
  for (const calendar of session.calendars) {
    const encodedSrc = encodeURIComponent(calendar.src);
    calendarFetches = [
      ...calendarFetches,
      fetch(`/api/ical/parse.json?src=${encodedSrc}`),
    ];
  }

  await Promise.allSettled(calendarFetches)
    .then(async (responses) => {
      for (const response of responses) {
        if (response.status !== "fulfilled") {
          continue;
        }

        const result = await response.value.json();

        const insertCardsIntoFirstList = (cards) => {
          const isCardAlreadyInLists = (card) => {
            for (const list of session.lists) {
              if (list.cards.find((c) => c._id === card._id)) {
                return true;
              }
            }

            if (session.archived_cards.find((c) => c._id === card._id)) {
              return true;
            }

            return false;
          };

          cards = cards.filter((c) => !isCardAlreadyInLists(c));
          if (session.lists && session.lists.length > 0) {
            session.lists[0].cards = [...session.lists[0].cards, ...cards];
          }
        };

        insertCardsIntoFirstList(result);
      }
    })
    .catch((err) => {
      console.error(err);
    });

  // Insert the user's data into `session`.
  await fetch(`/api/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lists: session.lists,
    }),
  }).catch((err) => {
    console.error(err);
  });
}
