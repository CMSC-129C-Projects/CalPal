<script>
  import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
  } from "sveltestrap/src";
  import ViewCard from "./ViewCard.svelte";

  export let card;
</script>

<div class="parent">
  <ViewCard bind:card />
  <Button class="cardButton">
    <Card class="actualCard">
      <CardBody class="cardBody">
        <CardTitle class="cardTitle">{card.card_name}</CardTitle>
        <CardSubtitle class="eventDate">{card.due_date_time}</CardSubtitle>
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
    /* margin: 10px; */
    /* border-width: 0.15em; */
    border-color: #d9d9d9;
    /* height: 65px; */
    /* background-color: lightgreen; */
  }

  .parent :global(.cardBody) {
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
    font-size: 0.9em;
  }
</style>
