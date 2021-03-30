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
    flex-direction: row;
    overflow-x: auto;
    padding: 8px;
    gap: 8px;
    height: 100%;
  }
</style>
