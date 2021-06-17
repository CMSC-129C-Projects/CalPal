<script>
  import { Container, Row, Col } from "sveltestrap";
  import Header from "../../components/Header.svelte";
</script>

<svelte:head>
  <title>CalPal Help</title>
</svelte:head>

<Header disableNavBar={true} />
<Container style="margin-top: 2rem;">
  <Row>
    <Col>
      <h1>Help</h1>
      <ul>
        <li>
          <a href="/help/syncing-google-calendars">Syncing Google Calendars</a>
        </li>
      </ul>
    </Col>
  </Row>
</Container>

<style>
  ul {
    list-style: none;
    margin-left: 0;
    padding-left: 1.2em;
  }
</style>
