<script>
  import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Collapse,
    Button,
    Icon,
  } from "sveltestrap";

  import FolderCard from "./FolderCard.svelte";
  import Title from "./Title.svelte";
  let isOpen = false;
</script>

<Card style="width: 100%;">
  <CardHeader>
    <Row>
      <Col xs="2">
        <div style="padding-top: 0.2rem;">
          <Icon name="folder" />
        </div>
      </Col>
      <Col xs="8">
        <Title />
      </Col>
      <Col xs="2">
        <button on:click={() => (isOpen = !isOpen)} class="borderless-button">
          {#if isOpen}
            <Icon name="chevron-up" style="padding-top: 0.4rem;" />
          {:else}
            <Icon name="chevron-down" style="padding-top: 0.4rem;" />
          {/if}
        </button>
      </Col>
    </Row>
  </CardHeader>
  {#if isOpen}
    <CardBody>
      <Row style="padding-left: 0%;">
        <Collapse style="padding: 0%;" {isOpen}><FolderCard /></Collapse>
      </Row>
    </CardBody>
  {/if}
</Card>

<style>
  .borderless-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    vertical-align: middle;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0;
    transition: transform 0.05s;
  }
</style>
