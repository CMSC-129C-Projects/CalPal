<script>
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";

  export let lists = [0];

  function createNewList() {
    console.debug("Here");
    const last = lists[-1];
    lists = lists.concat([last + 1]);
  }
</script>

<div class="flexBoxContainer">
  {#each lists as list}
    <List />
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
