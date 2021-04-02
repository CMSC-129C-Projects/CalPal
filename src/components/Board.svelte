<script>
  import { stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";

  const { session } = stores();

  function createNewList() {
    const last = $session.lists.slice(-1)[0];
    $session.lists = [
      ...$session.lists,
      { list_name: "Untitled List", is_archived: false },
    ];
    // console.debug(`lists is now ${lists}`);
  }
</script>

<div class="flexBoxContainer">
  {#each $session.lists as list (list.list_name)}
    <div transition:fade={{ duration: 150 }}>
      <List bind:list />
    </div>
  {/each}
  <AddListButton
    onClick={() => {
      createNewList();
    }}
  />
</div>

<style>
  .flexBoxContainer {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 8px;
    gap: 8px;
    height: 100%;
  }
</style>
