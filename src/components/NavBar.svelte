<script>
  import { Icon } from "sveltestrap/src";
</script>

<div class="parent">
  <button class="switchView"><Icon class="calendar" name="calendar3" /></button>
  <button class="addCalendar"
    ><Icon class="plus" name="plus-square-dotted" /></button
  >
</div>

<style>
  .parent {
    /*padding-left: 8em;*/
    padding-top: 0.5em;
    font-size: 10;
    text-align: right;
  }
  .switchView {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 30px;
    text-align: right;
  }
  .addCalendar {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 30px;
    text-align: right;
  }
  .parent :global(.calendar:hover) {
    color: #f58f29;
  }

  .parent :global(.plus:hover) {
    color: #f58f29;
  }
</style>
