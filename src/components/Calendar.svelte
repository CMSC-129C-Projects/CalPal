<script>
  import { stores } from "@sapper/app";
  import { Container } from "sveltestrap";
  import FullCalendar from "svelte-fullcalendar";
  import dayGridPlugin from "@fullcalendar/daygrid";

  const { session } = stores();

  let options = { initialView: "dayGridMonth", plugins: [dayGridPlugin], height: "100%" };
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