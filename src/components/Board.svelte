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
    const hasCard = (list) => {
      return list.cards
        .map((card) => {
          return card._id;
        })
        .includes(event.detail);
    };

    const listContainingCard = $session.lists.find((list) => hasCard(list));

    console.debug(`[Board.svelte] HERE`);
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
  {#each $session.lists as list (list._id)}
    <div transition:fade={{ duration: 150 }}>
      <List bind:list on:cardarchived={handleCardArchived} />
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
