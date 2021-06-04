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
      <div class="add-list-button-text">
        <span> Add List </span>
        <Icon class="add-list-button-plus-icon" name="plus" />
      </div>
    </Button>
  </span>
</div>

<style>
  .add-list-button-parent :global(.add-list-button-add-list) {
    height: calc(
      47px + 1px
    ); /* Add 1px to include the bottom border of CardHeader */
    width: 258px;
    background-color: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    color: rgba(0, 0, 0, 0.5);
    transition: background-color 100ms, color 100ms;
  }

  .add-list-button-parent :global(.add-list-button-add-list:hover) {
    background-color: rgba(0, 0, 0, 0.125);
    color: rgba(0, 0, 0, 0.75);
  }

  .add-list-button-parent :global(.add-list-button-add-list:active) {
    background-color: rgba(0, 0, 0, 0.25);
    color: rgba(0, 0, 0, 1);
  }

  .add-list-button-parent :global(.add-list-button-plus-icon) {
    font-size: 24px;
  }

  .add-list-button-text {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
