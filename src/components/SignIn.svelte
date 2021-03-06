<script>
  import { onMount } from "svelte";
  import { stores, goto } from "@sapper/app";
  import { Col, Container, Row, Spinner } from "sveltestrap/src";
  import { syncCards } from "../routes/util/_sync";

  const { session } = stores();

  const initializeUserSession = async (idToken, accessToken) => {
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
    await fetch(`/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });
    $session.user_id = userId;

    // Save the access token to the session, which can be used for
    // accessing Google APIs like the Google Calendar API.
    res = await fetch(`/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    });

    // Retrieve the user's cards.
    res = await fetch(`/api/card/${userId}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await res.json();
    for (const key in userData) {
      $session[key] = userData[key];
    }

    // Sync any new cards from the user's calendars.
    await syncCards($session, fetch);

    // Insert the user's data into `session`.
    res = await fetch(`/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Tell the server that we have now loaded the user's cards.
    res = await fetch(`/api/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        did_cards_load: true,
      }),
    });
    $session.did_cards_load = true;

    await goto("/board");
  };

  let googleApiScript;

  const renderSignInButton = () => {
    const scopes = [
      "profile",
      "https://www.googleapis.com/auth/calendar.events.readonly",
    ];

    /*global gapi*/
    gapi.signin2.render("g-sign-in", {
      scope: scopes.join(" "),
      longtitle: true,
      onsuccess: async (googleUser) => {
        const { id_token, access_token } = googleUser.getAuthResponse(true);
        await initializeUserSession(id_token, access_token);
      },
    });
  };

  let isGoogleApiScriptLoaded = false;

  onMount(() => {
    // If the script hasn't loaded yet, listen to the `load` event.
    // We know that it hasn't loaded if `gapi` doesn't exist.
    if (typeof gapi === "undefined") {
      googleApiScript.addEventListener("load", () => {
        renderSignInButton();
        isGoogleApiScriptLoaded = true;
      });
    } else {
      renderSignInButton();
      isGoogleApiScriptLoaded = true;
    }
  });
</script>

<svelte:head>
  <meta
    name="google-signin-client_id"
    content={$session.GOOGLE_OAUTH2_CLIENT_ID}
  />
  <script
    src="https://apis.google.com/js/platform.js"
    async
    defer
    bind:this={googleApiScript}></script>
</svelte:head>

<div class="sign-in-interface-flex-container">
  <div class="flex-item-left">
    <Container>
      <Row>
        <Col xs="4">
          <p class="overflow">
            <img src="CalPal_logo.png" class="calpal-logo" alt="CalPal Logo" />
            <span class="calpal cal">Cal</span>
            <span class="calpal pal">Pal</span>
          </p>
        </Col>
      </Row>
      <Row>
        <Col class="sign-in-interface-section-header">Welcome to CalPal!</Col>
      </Row>
      <Row>
        <Col class="sign-in-interface-section-body">
          <p>
            CalPal is a productivity tool which lets you manage your tasks and
            schedules.
          </p>
          <p>
            Sync multiple calendars and turn your events into card
            automatically.
          </p>
          <p>Look ahead into your schedule with calendar view.</p>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <Col class="sign-in-interface-sign-in-button" align="center">
          {#if !isGoogleApiScriptLoaded}
            <Spinner color="light" />
          {/if}
          <div id="g-sign-in" />
        </Col>
      </Row>
    </Container>
  </div>

  <div class="flex-item-right">
    <img
      src="div_illustration.png"
      class="div-illustration"
      alt="The CalPal team"
    />
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .overflow {
    white-space: nowrap;
  }

  .calpal-logo {
    width: 70px;
    height: 70px;
  }

  .div-illustration {
    width: 70%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  .calpal {
    font-size: 50px;
    font-family: "Nunito", sans-serif;
    position: relative;
    top: 0.3em;
    left: -0.1em;
    text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
      1px 1px 0 white;
  }

  .cal {
    color: #00b0f0;
  }

  .pal {
    color: #f58f29;
  }

  .sign-in-interface-flex-container {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    font-size: 1.875rem;
  }

  .flex-item-left {
    background-color: #78c0e0;
    padding-top: 1.25rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    flex: 35%;
  }

  .flex-item-left :global(.sign-in-interface-section-header) {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 2.5rem;
    font-weight: 500;
    color: white;
    padding-top: 1.25rem;
    padding-left: 1.875rem;
    line-height: 3.5rem;
  }

  .flex-item-left :global(.sign-in-interface-section-body) {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    color: white;
    padding-left: 1.875rem;
    padding-top: 2rem;
  }

  .flex-item-left :global(.sign-in-interface-section-body-login) {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.875rem;
    color: white;
    padding-top: 1.25rem;
    padding-right: 0.3125rem;
    text-align: center;
  }

  .flex-item-left :global(.sign-in-interface-sign-in-button) {
    padding: 1.875rem;
  }

  img {
    object-fit: contain;
    justify-content: center;
  }

  .flex-item-right {
    padding: 2.5rem;
    flex: 65%;
    align-self: center;
  }

  @media (max-width: 800px) {
    .flex-item-right,
    .flex-item-left {
      flex: 100%;
    }
  }
</style>
