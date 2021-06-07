<script>
  import { stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";
  import getObjectId from "../routes/util/_object-id.js";

  const { session } = stores();

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
</script>

<div class="board-flex-box-container">
  {#if $session.lists && $session.lists.length > 0}
    {#each $session.lists as list (list._id)}
      <div>
        <List bind:list />
      </div>
    {/each}
  {/if}
  <AddListButton
    onClick={() => {
      createNewList();
    }}
  />
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
</style>
