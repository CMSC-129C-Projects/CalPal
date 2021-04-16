<script>
  import { Alert } from "sveltestrap/src";

  let visible = true;
</script>

<Alert color="warning" isOpen={visible} toggle={() => (visible = false)}>
  I am an alert and I can be dismissed!
</Alert>
