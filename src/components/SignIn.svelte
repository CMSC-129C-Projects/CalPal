<script>
  import { stores } from "@sapper/app";
  import { Col, Container, Row } from "sveltestrap/src";
  import { Card, CardBody } from "sveltestrap/src";

  const { session } = stores();

  export let isNavBarVisible;

  const initializeUserSession = async (userId) => {
    console.debug("initializeUserSession()");

    await fetch(`/api/user/${userId}`, {
      method: "POST",
    });

    let res = await fetch(`/cards/${userId}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await res.json();
    console.debug(userData);
    $session = { ...userData };

    res = await fetch(`/cards/${userId}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });
  };

  if (typeof window !== "undefined") {
    window.onSignIn = async (googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.debug(`ID: ${profile.getId()}`);
      console.debug(`Full Name: ${profile.getName()}`);
      console.debug(`Given Name: ${profile.getGivenName()}`);
      console.debug(`Family Name: ${profile.getFamilyName()}`);
      console.debug(`Image URL: ${profile.getImageUrl()}`);
      console.debug(`Email: ${profile.getEmail()}`);

      const id_token = googleUser.getAuthResponse().id_token;
      console.debug(`ID Token: ${id_token}`);

      await initializeUserSession(id_token);
    };

    window.onSignOut = async () => {
      const auth2 = gapi.auth2.getAuthInstance();
      await auth2.signOut();
      console.debug("User signed out.");
    };
  }
</script>

<svelte:head>
  <meta
    name="google-signin-client_id"
    content="874358838704-q8m09bulue1j7hugsppo4e3tg9fqmrnc.apps.googleusercontent.com"
  />
  <script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

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
        </Row>
        <Row>
          <button
            on:click={() => {
              isNavBarVisible = !isNavBarVisible;
            }}
          >
            Go to Board
          </button>
        </Row>
        <Row>
          <button
            on:click={async () => {
              await window.onSignOut();
            }}
          >
            Sign out
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
