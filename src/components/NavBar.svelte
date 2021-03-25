<script>
  import { Icon } from "sveltestrap/src";
</script>

<div class="parent">
  <button class="scaleOnHover switchView"
    ><Icon class="calendar" name="calendar3" /></button
  >
  <button class="scaleOnHover addCalendar"
    ><Icon class="plus" name="plus-square-dotted" /></button
  >
</div>

<style>
  .parent {
    font-size: 10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: -0.3em;
  }

  .switchView {
    background-color: transparent;
    color: #40415a;
    border: none;
    outline: none;
    font-size: 30px;
    transition: transform 0.05s;
    transform-origin: center center;
  }

  .addCalendar {
    background-color: transparent;
    color: #40415a;
    border: none;
    outline: none;
    font-size: 30px;
    transition: transform 0.05s;
    transform-origin: center center;
  }

  .scaleOnHover:hover {
    transform: scale(1.1);
  }

  .parent :global(.calendar:active) {
    color: #f58f29;
  }

  .parent :global(.plus:active) {
    color: #f58f29;
  }
</style>
