<script context="module">
  export async function preload(_page, session) {
    if (session.did_cards_load) {
      // Sync any new cards from the user's calendars.
      let calendarFetches = [];
      for (const calendar of session.calendars) {
        calendarFetches = [
          ...calendarFetches,
          this.fetch(`/api/ical/parse.json?url=${calendar.url}`),
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
      await this.fetch(`/api/session`, {
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
  }
</script>

<script>
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from "svelte-dnd-action";

  overrideItemIdKeyNameBeforeInitialisingDndZones("_id");
</script>

<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    max-width: 100%;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
    height: 100vh;
  }
</style>
