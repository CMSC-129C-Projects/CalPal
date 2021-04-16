<script>
  import { stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";

  const { session } = stores();

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
