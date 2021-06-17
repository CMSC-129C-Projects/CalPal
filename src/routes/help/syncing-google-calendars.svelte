<script>
  import { Container, Row, Col, Icon } from "sveltestrap";
  import Header from "../../components/Header.svelte";
</script>

<svelte:head>
  <title>CalPal Help - Syncing Google Calendars</title>
</svelte:head>

<Header disableNavBar={true} />
<Container style="margin-top: 2rem;">
  <Row>
    <Col>
      <a href="/help"> <Icon name="arrow-left" /> Back to Help</a>
      <br />
      <h1>Syncing Google Calendars</h1>
      <p>
        This guide will help you sync your Google Calendars to CalPal. When you
        sync your Google Calendar, any new events are added to the Board as
        Cards!
      </p>
      <div class="img-group">
        <a
          href="/help/syncing-google-calendars/calendarsettings.png"
          target="_blank"
        >
          <img
            src="/help/syncing-google-calendars/calendarsettings.png"
            alt="Google Calendar settings"
            class="img-fluid"
          />
        </a>
        <a
          href="/help/syncing-google-calendars/calendarsidebar.png"
          target="_blank"
        >
          <img
            src="/help/syncing-google-calendars/calendarsidebar.png"
            alt="Google Calendar sidebar"
            class="img-fluid"
          />
        </a>
        <a href="/help/syncing-google-calendars/calendarid.png" target="_blank">
          <img
            src="/help/syncing-google-calendars/calendarid.png"
            alt="Google Calendar ID"
            class="img-fluid"
          />
        </a>
        <a
          href="/help/syncing-google-calendars/addcalendar.png"
          target="_blank"
        >
          <img
            src="/help/syncing-google-calendars/addcalendar.png"
            alt="Add Calendar modal"
            class="img-fluid"
          />
        </a>
      </div>
      <br />
      <ol>
        <li>Go to Google Calendar.</li>
        <li>Open Google Calendar settings.</li>
        <li>
          For personal calendars, go to <strong>
            'Settings for my calendars'
          </strong>
          section. For shared calendars, go to
          <strong>'Settings for other calendars'</strong> section.
        </li>
        <li>Select the calendar to be synced.</li>
        <li>
          A drop down menu will open. Scroll down to <strong>
            'Integrate calendar'.
          </strong>
        </li>
        <li>Look for the <strong>Calendar ID</strong> and copy it.</li>
        <li>In CalPal, click the <strong>Add Calendar</strong> button.</li>
        <li>Select the <strong>Google Calendar ID</strong> option.</li>
        <li>
          Add your preferred calendar title and <strong>
            paste the Calendar ID
          </strong> copied from your chosen Google Calendar.
        </li>
        <li>Click <strong>Add Calendar.</strong></li>
      </ol>
      <p>
        CalPal will sync your calendar and events. Cards will be automatically
        created from the synced calendar events.
      </p>
      <p>
        If there aren't any new Cards, try checking whether there are events in
        your Google Calendar.
      </p>
    </Col>
  </Row>
</Container>

<style>
  a {
    text-decoration: unset;
  }

  .img-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 1rem;
  }
</style>
