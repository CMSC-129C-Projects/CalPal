<script>
  import { stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";
  import Reminder from "./Reminder.svelte";

  const { session } = stores();

  export let id;

  function createNewList() {
    $session.lists = [
      ...$session.lists,
      { list_name: "Untitled List", is_archived: false, cards: [] },
    ];
  }
</script>

<div class="board-flex-box-container">
  {#each $session.lists as list, i (i)}
    <div transition:fade={{ duration: 150 }}>
      <List bind:list id="list-{i}" />
    </div>
  {/each}
  <AddListButton
    onClick={() => {
      createNewList();
    }}
  />
</div>
<div class="alert-area">
  <div class="alert-flexbox-container">
    {#each $session.lists as list, i (i)}
      {#each list.cards.filter((c) => {
        return !(typeof c.card_name === "undefined" || c.is_archived);
      }) as card, j (card)}
        <Reminder bind:card id="{id}-card-{j}" />
      {/each}
    {/each}
  </div>
</div>

<style>
  .board-flex-box-container {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 8px;
    gap: 8px;
    height: 100%;
  }

  .alert-area {
    position: fixed;
    bottom: 20px;
    left: 10px;
    margin: none;
    width: 400px;
    opacity: 0.85;
    color: rgba(255, 255, 255, 0.9);
  }

  .alert-flexbox-container {
    display: flex;
    flex-direction: column;
    overflow-x: none;
    overflow-y: auto;
    max-height: 255px;
  }
</style>
