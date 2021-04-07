<script context="module">
  export async function preload(page, session) {
    session.did_cards_load = false;

    console.debug(`[index.svelte] preload() called!`);
    const userId = "1";
    const userData = await this.fetch(`cards/${userId}.json`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          this.error(res.status, res.json().message);
        }
      })
      .catch((err) => {
        this.error(err);
      });

    await this.fetch(`cards/${userId}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((post_res) => {
      if (post_res.ok) {
        console.debug(`[index.svelte] POST success!`);
        session.user_id = userData.user_id;
        session.lists = userData.lists;
      } else {
        console.debug(`[index.svelte] POST failed.`);
        this.error(post_res.status, post_res.message);
        // throw new Error(`POST response failed: ${JSON.stringify(r)}`);
      }
    });

    session.did_cards_load = true;
  }
</script>

<script>
  import Header from "../components/Header.svelte";
  export let segment;
</script>

<main>
  <div class="fill">
    <Header />
    <slot />
  </div>
</main>

<style>
  main {
    position: relative;
    max-width: 100%;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
    height: 100vh;
  }

  .fill {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* slot {
    height: 100%;
  } */
</style>
