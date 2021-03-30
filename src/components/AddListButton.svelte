<script>
  import { Button, Icon } from "sveltestrap/src";
</script>

<div class="parent">
  <span>
    <Button class="addList" color="light">
      Add List
      <Icon class="plusIcon" name="plus" />
    </Button>
  </span>
</div>

<style>
  .parent :global(.addList) {
    height: 55px;
    width: 250px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    color: #aaa;
  }

  .parent :global(.plusIcon) {
    font-size: 24px;
    line-height: 0;
  }
</style>
