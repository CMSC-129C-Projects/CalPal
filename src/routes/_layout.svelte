<script context="module">
  export async function preload(_page, session) {
    session.did_cards_load = false;

    console.debug(`[_layout.svelte] preload() called!`);
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
        console.debug(`[_layout.svelte] POST success!`);
        session.user_id = userData.user_id;
        session.lists = userData.lists;
        session.archived_cards = userData.archived_cards;
      } else {
        console.debug(`[_layout.svelte] POST failed.`);
        this.error(post_res.status, post_res.message);
      }
    });

    session.did_cards_load = true;
  }
</script>

<main>
  <slot />
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
</style>
