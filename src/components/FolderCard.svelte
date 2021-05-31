<script>
  import { Button, Card, CardBody, CardSubtitle, CardTitle } from "sveltestrap";
  import { formattedDate } from "../routes/_date-format.js";
</script>

<div class="card-parent">
  <Button class="card-card-button" on:click>
    <Card class="card-actual-card">
      <CardBody class="card-card-body">
        <CardTitle class="card-card-title"
          >Folder Card Test More Words Pls</CardTitle
        >
        <CardSubtitle class="card-event-date" />
      </CardBody>
    </Card>
  </Button>
</div>

<style>
  .card-parent :global(.card-card-button) {
    background-color: transparent;
    padding: 0%;
    /* margin-bottom: 10px; */
    /* margin-left: 10px; */
    /* margin-right: 10px; */
    border: none;
    color: black;
    text-align: left;
    width: 100%;
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
