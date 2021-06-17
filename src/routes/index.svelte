<script>
  import SignIn from "../components/SignIn.svelte";
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="index-parent">
  <div class="index-sign-in">
    <SignIn />
  </div>
</div>

<style>
  .index-parent {
    display: flex;
    flex-direction: column;
    height: inherit;
  }

  .index-sign-in {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
</style>
