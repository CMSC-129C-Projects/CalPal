<script>
  import { Col, Container, Row } from "sveltestrap/src";
  import { Card, CardBody } from "sveltestrap/src";

  export let isNavBarVisible;

  function onSignIn(googleUser) {
    console.debug("HERE!");

    const profile = googleUser.getBasicProfile();
    console.debug(`ID: ${profile.getId()}`);
    console.debug(`Full Name: ${profile.getName()}`);
    console.debug(`Given Name: ${profile.getGivenName()}`);
    console.debug(`Family Name: ${profile.getFamilyName()}`);
    console.debug(`Image URL: ${profile.getImageUrl()}`);
    console.debug(`Email: ${profile.getEmail()}`);

    const id_token = googleUser.getAuthResponse().id_token;
    console.debug(`ID Token: ${id_token}`);
  }
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
