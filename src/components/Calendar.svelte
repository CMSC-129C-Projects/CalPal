<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import { Container } from "sveltestrap";
  import FullCalendar from "svelte-fullcalendar";
  import dayGridPlugin from "@fullcalendar/daygrid";

  const { session } = stores();

  const eventsFromCards = () => {
    let events = [];

    $session.lists.forEach((list) => {
      list.cards.forEach((card) => {
        const title =
          card.card_name !== "" ? card.card_name : card.original_title;
        const start = new Date(
          card.due_date_time !== "" ? card.due_date_time : card.original_date
        );

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

        events = [...events, event];
      });
    });

    return events;
  };

  let plugins = [];

  onMount(async () => {
    plugins = [(await import("@fullcalendar/daygrid")).default];
  });

  $: options = {
    initialView: "dayGridMonth",
    plugins: plugins,
    events: eventsFromCards(),
    dayMaxEventRows: true,
    height: "100%",
    eventTextColor: "#000000",
    eventDisplay: "block",
    displayEventTime: false,
  };
</script>

<div class="calendar-flex-box-container">
  <FullCalendar {options} />
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
