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
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
    overflow-x: auto;
  }
</style>
