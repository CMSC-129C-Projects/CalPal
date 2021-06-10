<script>
  import { onMount } from "svelte";
  import { Input, Label, Icon } from "sveltestrap";
  import getObjectId from "../routes/util/_object-id.js";

  export let cardId;
  export let attachments = [],
    name = "attachments",
    accept = ".svg, .jpg, .png, .gif, .doc, .docx, .pdf, .txt",
    error = false,
    multiple = "true",
    disabled = false;

  if (process.browser) {
    onMount(async () => {
      const res = await fetch(`/api/card/attachment/${cardId}.json`);
      if (!res.ok) {
        return;
      }

      attachments = await res.json();
    });
  }

  const isImage = (string) => /\.(jpe?g|pn?g|gi?f|sv?g)$/i.test(string);
  const imagePreviewStyle = (file) =>
    isImage(file.data.filename)
      ? `background-image: url('${file.data.path}');`
      : "";

  async function addAttachmentToDatabase(attachment) {
    await fetch(`/api/card/attachment.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ attachment: attachment }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(res.status, res.json().message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function previewFiles(e) {
    error = false;
    function readAndPreview(file) {
      errorMessage = "";
      
      if (file.size > 5000000) {
        errorMessage = "The attachment size exceeds 5 MB and cannot be uploaded."
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const newAttachment = {
          _id: getObjectId(),
          card_id: cardId,
          data: {
            filename: file.name,
            path: e.target.result,
            encoding: "base64",
            contentType: file.type,
            size: file.size,
          },
        };

        attachments = [...attachments, newAttachment];
        addAttachmentToDatabase(newAttachment);
      };
      reader.readAsDataURL(file);
    }
    e.target.files && [].forEach.call(e.target.files, readAndPreview);
  }

  async function deleteAttachment(attachmentId) {
    attachments = attachments.filter((a) => a._id !== attachmentId);

    await fetch(`/api/card/attachment/delete/${attachmentId}`, {
      method: "DELETE",
    });
  }
</script>

<Label for="attachments">
  <Icon name="paperclip" />
  Attachments
</Label>
<Input
  type="file"
  {name}
  {accept}
  on:change={previewFiles}
  {multiple}
  {disabled}
/>

<div class="attachment-parent">
  {#if attachments.length}
    <ul id="preview">
      {#each attachments as file (file._id)}
        <li class:is-image={isImage} style={imagePreviewStyle(file)}>
          <a href={file.data.path} target="_blank">{file.data.filename}</a>
          <button
            on:click={() => {
              if (!disabled) {
                deleteAttachment(file._id);
              }
            }}
          >
            <Icon name="x-circle-fill" class="attachment-delete-button" />
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  ul {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ul li {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.25rem 0;
    padding: 0.5rem;
    padding-left: 1rem;
    color: black;
    text-decoration: none;
    background: whitesmoke;
    border-radius: 25px;
    box-sizing: border-box;
    background-size: 45px;
    background-repeat: no-repeat;
    position: relative;
  }

  ul li a {
    width: 95%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ul li.is-image {
    padding-left: 50px;
  }

  ul li button {
    width: 1rem;
    position: absolute;
    right: 0.5rem;
    border: 0;
    padding: 0;
    margin: 0;
    display: flex;
  }

  .attachment-parent :global(.attachment-delete-button) {
    background-color: whitesmoke;
    color: rgba(0, 0, 0, 0.5);
  }

  .attachment-parent :global(.attachment-delete-button:hover) {
    color: rgba(0, 0, 0, 0.75);
  }

  .attachment-parent :global(.attachment-delete-button:active) {
    color: rgba(0, 0, 0, 1);
  }
</style>
