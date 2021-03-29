<script>
  import List from "./List.svelte";
</script>

<div class="flexBoxContainer">
  <List />
  <List />
  <List />
  <List />
  <List />
  <List />
  <List />
  <List />
  <List />
  <List />
  <List />
  <List />
</div>

<style>
  .flexBoxContainer {
    display: flex;
    background-color: lightpink;
    flex-direction: row;
    overflow-x: auto;
    margin: 8px;
    gap: 8px;
  }
</style>
