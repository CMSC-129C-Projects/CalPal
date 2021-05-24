<script>
  import { stores } from "@sapper/app";
  import { Col, Container, Row } from "sveltestrap/src";
  import { Card, CardBody } from "sveltestrap/src";

  const { session } = stores();

  export let isSignedIn;

  const initializeUserSession = async (idToken) => {
    // Verify ID token and get the corresponding user ID.
    let res = await fetch(`/api/user/idtoken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    const userId = await res.json();

    // Use the Google account's ID token as our `session.user_id`.
    await fetch(`/api/user/${userId}`, {
      method: "POST",
    });
    $session.user_id = userId;

    // Retrieve the user's cards.
    res = await fetch(`/cards/${userId}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await res.json();
    $session.lists = userData.lists;
    $session.archived_cards = userData.archived_cards;

    // Insert the user's cards into the `session`.
    res = await fetch(`/cards/${userId}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    // Tell the server that we have now loaded the user's cards.
    res = await fetch(`/cards/did-cards-load?set=1`, {
      method: "POST",
    });
    $session.did_cards_load = true;
  };

  if (typeof window !== "undefined") {
    window.onSignIn = async (googleUser) => {
      // TODO: Don't use the user's email as per
      //       https://developers.google.com/identity/sign-in/web/backend-auth.
      //       Probably do something like:
      const id_token = googleUser.getAuthResponse().id_token;
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
    content={$session.GOOGLE_OAUTH2_CLIENT_ID}
  />
  <script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

<div class="sign-in-div">
  <Card body color="transparent" class="sign-in-card">
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
          <Col>
            <button
              on:click={() => {
                isSignedIn = !isSignedIn;
              }}
            >
              Go to Board
            </button>
          </Col>
          <Col>
            <button
              on:click={() => {
                initializeUserSession("1");
                isSignedIn = !isSignedIn;
              }}
            >
              Go to debug Board
            </button>
          </Col>
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
  }
</style>
