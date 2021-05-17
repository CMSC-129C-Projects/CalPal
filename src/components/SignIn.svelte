<script>
  import { Col, Container, Row } from "sveltestrap";
</script>

<div class="sign-in-parent">
  <Container class="sign-in-container">
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Row>
          <Col class="sign-in-col" sm="12" md={{ size: 6, offset: 3 }}
            >Log into CalPal
          </Col>
        </Row>
        <Row>
          <div class="g-signin2" data-onsuccess="onSignIn" />
        </Row>
      </Col>
    </Row>
  </Container>
</div>

<style>
  .sign-in-parent :global(.sign-in-container) {
    /* background-color: lightcoral; */
    text-align: center;
  }

  .sign-in-parent :global(.sign-in-col) {
    background-color: lightgray;
    font-size: 1.5em;
    color: dodgerblue;
  }
</style>
