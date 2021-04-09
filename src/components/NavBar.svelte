<script>
  import { Icon } from "sveltestrap/src";
</script>

<div class="parent">
  <button class="scaleOnHover borderlessButton"
    ><Icon class="calendar" name="calendar3" /></button
  >
  <button class="scaleOnHover borderlessButton"
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
    gap: 1em;
    /* margin-top: -0.3em; */
  }

  .borderlessButton {
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0%;
    font-size: 30px;
    transition: transform 0.05s;
    transform-origin: center center;
  }

  .scaleOnHover:hover {
    transform: scale(1.1);
  }

  .parent :global(.calendar) {
    color: #40415a;
  }

  .parent :global(.plus) {
    color: #40415a;
  }

  .parent :global(.calendar:active) {
    color: #f58f29;
  }

  .parent :global(.plus:active) {
    color: #f58f29;
  }
</style>
