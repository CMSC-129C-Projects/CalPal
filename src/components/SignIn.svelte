<script>
  import { Col, Container, Row } from "sveltestrap/src";
  import { Card, CardBody } from "sveltestrap/src";
  import { GoogleAuth } from "@beyonk/svelte-social-auth";

  export let isSignedIn;
</script>

<div class="sign-in-div">
  <Card body color="transparent" class="sign-in-card">
    <CardBody class="sign-in-body">
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            Log into CalPal
            <GoogleAuth
              clientId="874358838704-q8m09bulue1j7hugsppo4e3tg9fqmrnc.apps.googleusercontent.com"
              on:auth-success={(e) => console.debug(e.detail.user)}
            />
            <button
              on:click={() => {
                isSignedIn = !isSignedIn;
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

<style>
  .sign-in-div {
    display: flex;
    justify-content: center;
    text-align: center;
  }
</style>
