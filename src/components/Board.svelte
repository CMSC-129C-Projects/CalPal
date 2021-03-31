<script>
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";

  export let lists;

  function createNewList() {
    const last = lists.slice(-1)[0];
    lists = [...lists, { list_name: "New List" }];
    console.debug(`lists is now ${lists}`);
  }
</script>

<div class="flexBoxContainer">
  {#each lists as list, i}
    <div transition:fade={{ duration: 150 }}>
      <List list_name={list.list_name} id="list-{i}" />
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
