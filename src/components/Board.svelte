<script>
  import { stores } from "@sapper/app";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";
  import getObjectId from "../routes/util/_object-id.js";

  const { session } = stores();
  const flipDurationMs = 100;

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

  function handleSort(e) {
    $session.lists = e.detail.items;
  }
</script>

<div class="board-flex-box-container">
  <div>
    <section
      use:dndzone={{
        items: $session.lists,
        type: "list",
        dropTargetStyle: {
          outline: "rgba(0, 0, 0, 0)",
        },
        flipDurationMs,
      }}
      on:consider={handleSort}
      on:finalize={handleSort}
      class="board-section"
    >
      {#if $session.lists && $session.lists.length > 0}
        {#each $session.lists as list (list._id)}
          <div animate:flip={{ duration: flipDurationMs }}>
            <List bind:list />
          </div>
        {/each}
      {/if}
    </section>
  </div>
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
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .board-section {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0.5rem;
  }
</style>
