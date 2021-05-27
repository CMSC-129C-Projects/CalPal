<script>
  import { stores } from "@sapper/app";
  import { Container } from "sveltestrap";
  import FullCalendar from "svelte-fullcalendar";
  import dayGridPlugin from "@fullcalendar/daygrid";

  const { session } = stores();

  const eventsFromCards = () => {
    let events = [];

    $session.lists.forEach((list) => {
      list.cards.forEach((card) => {
        const event = {
          title: card.card_name !== "" ? card.card_name : card.original_title,
          date: card.due_date_time !== "" ? card.due_date_time : card.original_date
        };

        events = [...events, event];
      });
    });

    return events;
  };

  $: options = { initialView: "dayGridMonth", plugins: [dayGridPlugin], height: "100%", events: eventsFromCards() };
</script>

<div class="calendar-flex-box-container">
  <Container style="height: 100%;">
    <FullCalendar {options} />
  </Container>
</div>

<style>
  .calendar-flex-box-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 100%;
  }
</style>