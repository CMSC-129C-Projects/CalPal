<script>
  import { Button, Icon } from "sveltestrap";

  export let onClick;
</script>

<div class="add-list-button-parent">
  <span>
    <Button
      class="add-list-button-add-list"
      color="light"
      on:click={() => onClick()}
    >
      Add List
      <Icon class="add-list-button-plus-icon" name="plus" />
    </Button>
  </span>
</div>

<style>
  .add-list-button-parent :global(.add-list-button-add-list) {
    height: 56px;
    width: 250px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    color: #aaa;
  }

  .add-list-button-parent :global(.add-list-button-plus-icon) {
    font-size: 24px;
    line-height: 0;
  }
</style>
