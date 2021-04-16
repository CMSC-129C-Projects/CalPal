<script>
  import { Alert } from "sveltestrap/src";
  import formattedDate from "../routes/_date-format.js";
  export let card;

  $: dueDate = formattedDate(new Date(card.due_date_time));
  $: {
    if (card.due_date_time === "") {
      card.remind_date_time = "";
    }
  }
</script>

{#if !card.is_archived}
  {#if card.remind_date_time != "" && card.due_date_time != ""}
    {#if Date.now() >= new Date(card.remind_date_time)}
      <Alert color="warning">This task is due on {dueDate}</Alert>
    {/if}
  {/if}
{/if}
