<script>
  import { Alert } from "sveltestrap/src";
  import { formattedDate } from "../routes/_date-format.js";

  export let card;

  $: dueDate = formattedDate(new Date(card.due_date_time));
  $: cardName = card.card_name;
  let visible = true;
</script>

{#if !card.is_archived}
  {#if card.remind_date_time != "" && card.due_date_time != ""}
    {#if Date.now() >= new Date(card.remind_date_time)}
      {#if new Date(Date.now()).toDateString() === new Date(card.due_date_time).toDateString()}
        <Alert color="danger" isOpen={visible} toggle={() => (visible = false)}>
          {cardName} is due today, {dueDate}.
        </Alert>
      {:else if Date.now() < new Date(card.due_date_time)}
        <Alert
          color="warning"
          isOpen={visible}
          toggle={() => (visible = false)}
        >
          {cardName} is due on {dueDate}
        </Alert>
      {:else}
        <Alert
          color="secondary"
          isOpen={visible}
          toggle={() => (visible = false)}
        >
          {cardName} was due on {dueDate}
        </Alert>
      {/if}
    {/if}
  {/if}
{/if}
