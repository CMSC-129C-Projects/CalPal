<script>
  import { stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";

  const { session } = stores();

  function createNewList() {
    $session.lists = [
      ...$session.lists,
      {
        _id: $session.new_object_id,
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

  function handleCardUnarchived(event) {
    console.debug(`[Board.svelte] Handling 'cardunarchived'...`);
    if ($session.lists.length === 0) {
      throw new Error(`There are no lists to place the unarchived card into`);
    }

    let cardToUnarchive;
    const cardIndex = $session.archived_cards.findIndex((card) => {
      if (card._id === event.detail) {
        cardToUnarchive = card;
        return true;
      }
      return false;
    });

    if (typeof cardToUnarchive === "undefined") {
      throw new Error(
        `Couldn't find card ${event.detail} in the list of archived cards`
      );
    }

    $session.lists[0] = [...$session.lists[0], cardToUnarchive];

    const beforeCards = $session.archived_cards.slice(0, cardIndex);
    const afterCards = $session.archived_cards.slice(cardIndex + 1);
    $session.archived_cards = [...beforeCards, ...afterCards];
  }
</script>

<div class="board-flex-box-container">
  {#each $session.lists as list (list._id)}
    <div transition:fade={{ duration: 150 }}>
      <List
        bind:list
        on:cardarchived={handleCardArchived}
        on:cardunarchived={handleCardUnarchived}
      />
    </div>
  {/each}
  <AddListButton
    onClick={() => {
      createNewList();
    }}
  />
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
</style>
