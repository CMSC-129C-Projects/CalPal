<script>
  import { Button, Card, CardBody, CardSubtitle, CardTitle } from "sveltestrap";
  import { formattedDate } from "../routes/_date-format.js";

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
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border: none;
    color: black;
    text-align: left;
    width: 230px;
  }

  .card-parent :global(.card-actual-card) {
    border-color: #d9d9d9;
  }

  .card-parent :global(.card-card-body) {
    background-color: var(--card-color, transparent);
    padding-top: 0%;
    padding-bottom: 0%;
    padding-left: 5%;
  }

  .card-parent :global(.card-card-title) {
    margin-bottom: 2%;
    font-size: 1.25em;
  }

  .card-parent :global(.card-event-date) {
    padding-top: 0%;
    padding-bottom: 2%;
    font-size: 0.9em;
  }
</style>
