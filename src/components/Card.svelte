<script>
  import { Button, Card, CardBody, CardSubtitle, CardTitle } from "sveltestrap";
  import { formattedDate } from "../routes/util/_date-format.js";

  export let card;
  export let isArchived;

  $: cardColor = isArchived ? "#AAAAAA" : card.color;

  let dateToDisplay;
  $: {
    const originalDate = new Date(card.original_date);
    const dueDateTime = new Date(card.due_date_time);

    if (dueDateTime.toString() !== "Invalid Date") {
      dateToDisplay = formattedDate(dueDateTime);
    } else if (originalDate.toString() !== "Invalid Date") {
      dateToDisplay = formattedDate(originalDate);
    } else {
      dateToDisplay = "";
    }
  }
</script>

<div class="card-parent" style="--card-color: {cardColor}">
  <Button class="card-card-button" on:click>
    <Card class="card-actual-card">
      <CardBody class="card-card-body">
        <CardTitle class="card-card-title">{card.card_name}</CardTitle>
        <CardSubtitle class="card-event-date">
          {dateToDisplay}
        </CardSubtitle>
      </CardBody>
    </Card>
  </Button>
</div>

<style>
  .card-parent :global(.card-card-button) {
    background-color: transparent;
    padding: 0%;
    border: none;
    color: black;
    text-align: left;
    width: 100%;
  }

  .card-parent :global(.card-actual-card) {
    border-color: rgba(0, 0, 0, 0.125);
  }

  .card-parent :global(.card-card-body) {
    display: flex;
    flex-direction: column;
    background-color: var(--card-color, transparent);
    padding-top: 0.3em;
    padding-bottom: 0.3em;
  }

  .card-parent :global(.card-card-title) {
    font-size: 1.25em;
    margin-top: 0.05em;
    margin-bottom: 0;
  }

  .card-parent :global(.card-event-date) {
    font-size: 0.9em;
    margin-top: 0.2em;
  }
</style>
