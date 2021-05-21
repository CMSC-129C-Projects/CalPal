<script>
  import { Col, Container, Row } from "sveltestrap/src";
  import { Card, CardBody } from "sveltestrap/src";

  export let isNavBarVisible;
</script>

<div class="sign-in-div">
  <Card body color="light" class="sign-in-card">
    <CardBody class="sign-in-body">
      <Container>
        <Row>
          <Col class="log-in-text" sm="12" md={{ size: 6, offset: 3 }}>
            Log into CalPal
          </Col>
        </Row>
        <Row>
          <div class="g-signin2" data-onsuccess="onSignIn" />
          <button
            on:click={() => {
              isNavBarVisible = !isNavBarVisible;
            }}
          >
            Test
          </button>
        </Row>
      </Container>
    </CardBody>
  </Card>
</div>

<style>
  .sign-in-div {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 50%;
  }
</style>
