<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { stores } from "@sapper/app";
  import FullCalendar from "svelte-fullcalendar";
  import ViewCard from "./ViewCard.svelte";

  const { session } = stores();
  const selectedCard = writable(null);

  const eventFromCard = (card) => {
    const title = card.card_name !== "" ? card.card_name : card.original_title;
    const start = new Date(
      card.due_date_time !== "" ? card.due_date_time : card.original_date
    );

    if (start.toString() === "Invalid Date") {
      return null;
    }

    // NOTE: By default, FullCalendar lets the duration of an event without
    //       an end time to be one hour long. This means that events after
    //       11:00 PM spill over into the next day.
    //       To fix this, we just set each event to be one second long.
    let end = new Date(start);
    end.setSeconds(start.getSeconds() + 1);

    const event = {
      id: card._id,
      title: title,
      start: start,
      end: end,
      backgroundColor: card.color,
      borderColor: "rgba(0, 0, 0, 0.125)",
    };

    return event;
  };

  const eventsFromCards = () => {
    let events = [];

    $session.lists.forEach((list) => {
      list.cards.forEach((listElement) => {
        if (listElement.folder_name != null) {
          listElement.cards.forEach((card) => {
            const event = eventFromCard(card);
            if (event) {
              events = [...events, event];
            }
          });
        } else {
          const event = eventFromCard(listElement);
          if (event) {
            events = [...events, event];
          }
        }
      });
    });

    return events;
  };

  let events = eventsFromCards();
  let options;
  let plugins;

  $: {
    const updateCard = (id) => {
      const isFolder = (el) => {
        if (el.folder_name != null) {
          return true;
        }
        return false;
      };

      for (const list of $session.lists) {
        for (let listElement of list.cards) {
          if (isFolder(listElement)) {
            for (let card of listElement.cards) {
              if (card._id === id) {
                card = $selectedCard;
                return;
              }
            }
          } else {
            if (listElement._id === id) {
              listElement = $selectedCard;
              return;
            }
          }
        }
      }

      return null;
    };

    if ($selectedCard) {
      updateCard($selectedCard._id);

      // NOTE: Whenever something in the Calendar component changes, it
      //       doesn't seem to call `preload()` of the parent route for
      //       some reason.
      //       This results in super laggy performance if you're editing
      //       a Card from the Calendar.
      //       For now, we manually update the session and database.
      fetch(`/api/card/update?user=${$session.user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lists: $session.lists,
          archived_cards: $session.archived_cards,
          calendars: $session.calendars,
        }),
      });

      events = eventsFromCards();
    }

    const eventClick = (eventClickInfo) => {
      for (const list of $session.lists) {
        let result = list.cards.find((c) => c._id === eventClickInfo.event.id);
        if (result) {
          $selectedCard = result;
        } else if (typeof result === "undefined") {
          // We couldn't find the card in the first level. Look for it inside folders.
          const folders = list.cards.filter((c) => c.folder_name != null);
          for (const folder of folders) {
            result = folder.cards.find(
              (c) => c._id === eventClickInfo.event.id
            );
            if (result) {
              $selectedCard = result;
              break;
            }
          }
        } else {
          $selectedCard = null;
        }
      }
    };

    options = {
      initialView: "dayGridMonth",
      plugins,
      events,
      eventClick,
      dayMaxEventRows: true,
      height: "100%",
      eventTextColor: "#000000",
      eventDisplay: "block",
      displayEventTime: false,
    };
  }

  onMount(async () => {
    plugins = [(await import("@fullcalendar/daygrid")).default];
  });
</script>

<div class="calendar-flex-box-container">
  <FullCalendar {options} />
  {#if $selectedCard}
    <ViewCard
      bind:card={$selectedCard}
      showCard={false}
      on:close={() => {
        $selectedCard = null;
      }}
    />
  {/if}
</div>

<style>
  .calendar-flex-box-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 100%;
  }
</style>
