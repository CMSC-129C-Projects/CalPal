<script>
  import {
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    Col,
    Container,
    Row,
    Button,
  } from "sveltestrap";

  export let color;

  const colors = {
    aprilSunrise: {
      aprilSunrise1: "#fff861",
      aprilSunrise2: "#ffd05e",
      aprilSunrise3: "#c1f9f4",
      aprilSunrise4: "#cfe5ec",
      aprilSunrise5: "#fff861",
    },
    schro: {
      schro1: "#ffa29a",
      schro2: "#ffcdcd",
      schro3: "#ffcc61",
      schro4: "#96f4d3",
      schro5: "#04d1ca",
    },
    lucca: {
      lucca1: "#aed0e5",
      lucca2: "#cec198",
      lucca3: "#fbeab7",
      lucca4: "#a6d7c2",
      lucca5: "#f6e9c8",
    },
    winnieThePooh: {
      winnieThePooh1: "#ffdaa1",
      winnieThePooh2: "#fff19c",
      winnieThePooh3: "#ff6d6d",
      winnieThePooh4: "#d8fffe",
      winnieThePooh5: "#f4c9dc",
    },
    herbsAndSpices: {
      herbsAndSpices1: "#e1cf6b",
      herbsAndSpices2: "#c294b8",
      herbsAndSpices3: "#ffa363",
      herbsAndSpices4: "#8a915d",
      herbsAndSpices5: "#f2d88e",
    },
  };

  function chooseColor(newColor) {
    color = newColor;
  }

  let isOpen = false;
</script>

<div class="color-picker-parent">
  <Dropdown
    {isOpen}
    toggle={() => {
      isOpen = !isOpen;
    }}
  >
    <DropdownToggle class="color-picker-button" caret>Color</DropdownToggle>
    <DropdownMenu class="color-picker-menu">
      <Container>
        {#each Object.entries(colors) as [_palette, paletteColors]}
          <Row>
            {#each Object.entries(paletteColors) as [_colorName, colorValue]}
              <Col>
                <Button
                  class="color-picker-colors"
                  style="background-color: {colorValue}; border-color: {colorValue}"
                  on:click={() => chooseColor(colorValue)}
                />
              </Col>
            {/each}
          </Row>
        {/each}
      </Container>
    </DropdownMenu>
  </Dropdown>
</div>

<style>
  .color-picker-parent :global(.color-picker-button) {
    background-color: transparent;
    color: black;
    box-shadow: none;
  }

  .color-picker-parent :global(.color-picker-menu) {
    width: 300px;
  }

  .color-picker-parent :global(.color-picker-colors) {
    box-shadow: none;
  }
</style>
