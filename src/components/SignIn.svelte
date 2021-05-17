<script>
  import { Col, Container, Row } from "sveltestrap";
  import { GoogleAuth } from "@beyonk/svelte-social-auth";
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
          <GoogleAuth
            clientId="874358838704-q8m09bulue1j7hugsppo4e3tg9fqmrnc.apps.googleusercontent.com"
            on:auth-success={(e) => console.debug(e.detail.user)}
          />
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
