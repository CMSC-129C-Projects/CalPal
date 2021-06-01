<script>
  import { stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";
  import Reminder from "./Reminder.svelte";
  import getObjectId from "../routes/util/_object-id.js";

  const { session } = stores();

  export let id;

  async function createNewList() {
    const objectId = await getObjectId();
    $session.lists = [
      ...$session.lists,
      {
        _id: objectId,
        list_name: "Untitled List",
        cards: [],
      },
    ];
  }

  function handleCardArchived(event) {
    console.debug(`[Board.svelte] Handling 'cardarchived'...`);
    const hasCard = (list) => {
      return list.cards
        .map((card) => {
          return card._id;
        })
        .includes(event.detail);
    };

    const listContainingCard = $session.lists.find((list) => hasCard(list));

    const card = listContainingCard.cards.find((c) => c._id === event.detail);
    const cardIndex = listContainingCard.cards
      .map((c) => {
        return c._id;
      })
      .findIndex((c) => c === event.detail);
    const beforeCards = listContainingCard.cards.slice(0, cardIndex);
    const afterCards = listContainingCard.cards.slice(cardIndex + 1);

    $session.lists.find((list) => hasCard(list)).cards = [
      ...beforeCards,
      ...afterCards,
    ];

    $session.archived_cards = [...$session.archived_cards, card];
  }
</script>

<div class="board-flex-box-container">
  {#if $session.lists && $session.lists.length > 0}
    {#each $session.lists as list (list._id)}
      <div transition:fade={{ duration: 150 }}>
        <List bind:list on:cardarchived={handleCardArchived} />
      </div>
    {/each}
  {/if}
  <AddListButton
    onClick={() => {
      createNewList();
    }}
  />
</div>
<div class="alert-area">
  <div class="alert-flexbox-container">
    {#if $session.lists && $session.lists.length > 0}
      {#each $session.lists as list, i (i)}
        {#each list.cards.filter((c) => {
          return !(typeof c.card_name === "undefined" || c.is_archived);
        }) as card, j (card)}
          <Reminder bind:card id="{id}-card-{j}" />
        {/each}
      {/each}
    {/if}
  </div>
</div>

<style>
  .board-flex-box-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 8px;
    gap: 8px;
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
