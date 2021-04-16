<script>
</script>

<div class="parent">
  <button class="scale-on-hover borderless-button">
    <img src="add_calendar.png" alt="Add Calendar" />
  </button>
  <button class="scale-on-hover borderless-button">
    <img src="switch_board_view.png" alt="Board view" />
  </button>
</div>

<style>
  .parent {
    font-size: 10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1em;
  }

  .borderless-button {
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0%;
    font-size: 30px;
    transition: transform 0.05s;
    transform-origin: center center;
  }

  .scale-on-hover:hover {
    transform: scale(1.1);
  }

  img {
    width: 45px;
    height: 45px;
  }
</style>
