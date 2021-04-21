<script>
  import { stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";

  const { session } = stores();

  export let newObjectId;

  function createNewList() {
    $session.lists = [
      ...$session.lists,
      {
        _id: newObjectId,
        list_name: "Untitled List",
        cards: [],
      },
    ];
  }
</script>

<div class="board-flex-box-container">
  {#each $session.lists as list (list._id)}
    <div transition:fade={{ duration: 150 }}>
      <List bind:list id="list-{list._id}" />
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
