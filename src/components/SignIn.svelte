<script>
  import { Col, Container, Row } from "sveltestrap/src";
  import { Card, CardBody } from "sveltestrap/src";
  import { GoogleAuth } from "@beyonk/svelte-social-auth";

  export let isNavBarVisible;
</script>

<div class="flex-container">
  <div class="flex-item-left">
    <Container>
      <Row>
        <Col class="section-header">Welcome to CalPal!</Col></Row
      >
      <Row>
        <Col class="section-body"
          >CalPal is a productivity tool which lets you manage your tasks,
          schedules, whatever whatever</Col
        >
      </Row>
    </Container>
  </div>

  <div class="flex-item-right">
    <div class="sign-in-div">
      <Card body color="light" class="sign-in-card">
        <CardBody class="sign-in-body">
          <Container>
            <Row>
              <Col class="log-in-text" sm="12" md={{ size: 6, offset: 3 }}
                >Log into CalPal</Col
              >
            </Row>
            <Row>
              <Col class="log-in-text" sm="12" md={{ size: 6, offset: 3 }}>
                <GoogleAuth
                  clientId="874358838704-q8m09bulue1j7hugsppo4e3tg9fqmrnc.apps.googleusercontent.com"
                  on:auth-success={(e) => console.debug(e.detail.user)}
                />
                <button
                  on:click={() => {
                    isNavBarVisible = !isNavBarVisible;
                  }}
                >
                  Test
                </button>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </div>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .flex-container {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    /* background-color: red; */
    font-size: 30px;
  }

  .flex-item-left {
    background-color: dodgerblue;
    padding: 40px;
    flex: 40%;
  }

  .flex-item-left :global(.section-header) {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 50px;
    color: white;
    padding: 10px;
  }

  .flex-item-left :global(.section-body) {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: white;
  }

  .flex-item-right {
    /* background-color: lightgray; */
    padding: 40px;
    flex: 60%;
    align-self: center;
  }

  @media (max-width: 800px) {
    .flex-item-right,
    .flex-item-left {
      flex: 100%;
    }
  }
  .sign-in-div {
    display: flex;
    justify-content: center;
    text-align: center;
    /* width: 50%; */
  }
</style>
