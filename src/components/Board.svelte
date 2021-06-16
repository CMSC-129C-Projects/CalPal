<script>
  import { stores } from "@sapper/app";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";
  import getObjectId from "../routes/util/_object-id.js";

  const { session } = stores();
  const flipDurationMs = 100;

  function createNewList() {
    $session.lists = [
      ...$session.lists,
      {
        _id: getObjectId(),
        list_name: "Untitled List",
        cards: [],
      },
    ];
  }

  function handleSort(e) {
    $session.lists = e.detail.items;
  }
</script>

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
      <div
        animate:flip={{ duration: flipDurationMs }}
        style="flex: 0 1 auto; display: flex; max-height: 100%;"
      >
        <List bind:list />
      </div>
    {/each}
  {/if}
  <AddListButton
    onClick={() => {
      createNewList();
    }}
  />
</section>

<style>
  .board-section {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    overflow: auto;
    padding: 0.5rem;
    gap: 0.5rem;
    height: 100%;
    width: 100%;
  }
</style>
