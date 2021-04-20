<script>
  import { stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import List from "./List.svelte";
  import AddListButton from "./AddListButton.svelte";

  const { session } = stores();

  function createNewList() {
    const untitledListPattern = /^Untitled List( \([0-9]+\))?$/;

    const getListNumberFromName = (listName) => {
      if (listName === "Untitled List") {
        return 0;
      }

      if (untitledListPattern.test(listName)) {
        const wordsInName = listName.split(" ");
        const numberString = wordsInName[2];
        const listNumber = parseInt(numberString.slice(1, numberString.length));
        return listNumber;
      }

      return null;
    };

    let maxListNumber = null;
    $session.lists.forEach((l) => {
      const listNumber = getListNumberFromName(l.list_name);
      if (maxListNumber === null && l.list_name === "Untitled List") {
        maxListNumber = 0;
      } else if (listNumber > maxListNumber) {
        maxListNumber = listNumber;
      }
    });

    const listName =
      maxListNumber === null
        ? "Untitled List"
        : `Untitled List (${maxListNumber + 1})`;

    $session.lists = [
      ...$session.lists,
      {
        list_name: listName,
        is_archived: false,
        cards: [],
      },
    ];
  }
</script>

<div class="board-flex-box-container">
  {#each $session.lists as list, i (list)}
    <div transition:fade={{ duration: 150 }}>
      <List bind:list id="list-{i}-{list.list_name}" />
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
