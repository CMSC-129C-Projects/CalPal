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
    color: #40415a;
    border: none;
    outline: none;
    font-size: 30px;
    text-align: right;
    /* transition: transform 0.1s; */
  }

  .addCalendar {
    background-color: transparent;
    color: #40415a;
    border: none;
    outline: none;
    font-size: 30px;
    text-align: right;
    /* transition: transform 0.1s; */
  }

  .switchView:hover {
    transform: scale(1.1);
  }

  .addCalendar:hover {
    transform: scale(1.1);
  }

  .parent :global(.calendar:active) {
    color: #f58f29;
  }

  .parent :global(.plus:active) {
    color: #f58f29;
  }
</style>
