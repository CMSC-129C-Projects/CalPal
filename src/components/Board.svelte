<script>
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";

  export let lists = [0];

  function createNewList() {
    const last = lists.slice(-1)[0];
    lists = [...lists, last + 1];
    console.debug(`lists is now ${lists}`);
  }
</script>

<div class="flexBoxContainer">
  {#each lists as list (list)}
    <div transition:fade={{ duration: 150 }}>
      <List />
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
