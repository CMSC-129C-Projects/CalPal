<script>
  import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
  } from "sveltestrap/src";
  import formattedDate from "../routes/_date-format.js";

  export let card;

  $: cardColor = card.color;
  $: {
    if (card.is_archived) {
      cardColor = "#AAAAAA";
    }
  }

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

<div class="parent" style="--card-color: {cardColor}">
  <Button class="cardButton" on:click>
    <Card class="actualCard">
      <CardBody class="cardBody">
        <CardTitle class="cardTitle">{card.card_name}</CardTitle>
        <CardSubtitle class="eventDate">
          {dateToDisplay}
        </CardSubtitle>
      </CardBody>
    </Card>
  </Button>
</div>

<style>
  .parent :global(.cardButton) {
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

  .parent :global(.actualCard) {
    border-color: #d9d9d9;
  }

  .parent :global(.cardBody) {
    background-color: var(--card-color, transparent);
    padding-top: 0%;
    padding-bottom: 0%;
    padding-left: 5%;
  }

  .parent :global(.cardTitle) {
    margin-bottom: 2%;
    font-size: 1.25em;
  }

  .parent :global(.eventDate) {
    padding-top: 0%;
    padding-bottom: 2%;
    font-size: 0.9em;
  }
</style>
