<script>
  import { Alert } from "sveltestrap/src";

  export let card;

  $: dueDate = new Date(card.due_date_time);
</script>

{#if !card.is_archived}
  {#if Date.now() >= new Date(card.remind_date_time)}
    <Alert color="warning">This task is due on {dueDate}</Alert>
  {/if}
{/if}
