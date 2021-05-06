<script>
  import { onMount } from "svelte";
  import { CustomInput, Label, Icon } from "sveltestrap/src";

  export let cardId;
  export let attachments = [],
    name = "attachments",
    accept = ".svg, .jpg, .png, .gif, .doc, .docx, .pdf, .txt",
    error = false,
    multiple = "true",
    disabled = false;

  if (process.browser) {
    onMount(async () => {
      const res = await fetch(`cards/attachments/${cardId}.json`);
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

  async function addAttachmentToDatabase(e) {
    // TODO: Limit filesize.
    const file = e.target.files[0];
    const reader = new FileReader();
    let fileData;
    reader.onload = async (e) => {
      fileData = e.target.result;

      const newAttachment = {
        filename: file.name,
        path: fileData,
        encoding: "base64",
        contentType: file.type,
        size: file.size,
      };

      await fetch(`cards/attachments/${cardId}.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attachment: newAttachment }),
      })
        .then((res) => {
          if (!res.ok) {
            console.error(res.status, res.json().message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    reader.readAsDataURL(file);
  }

  function previewFiles(e) {
    error = false;
    function readAndPreview(file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        attachments = [
          ...attachments,
          {
            filename: file.name,
            path: e.target.result,
            encoding: "base64",
            contentType: file.type,
            size: file.size,
          },
        ];
      };
      reader.readAsDataURL(file);
    }
    e.target.files && [].forEach.call(e.target.files, readAndPreview);
  }

  function deleteAttachment(i) {
    attachments.splice(i, 1);
    attachments = attachments;
  }
</script>

<!-- <label class:more={attachments.length} class:error class:disabled> -->
<!-- Add Attachment -->
<!-- {#if !attachments.length}Files{/if} -->
<!-- <input
    type="file"
    {name}
    {accept}
    on:input
    on:change={previewFiles}
    {multiple}
    {disabled}
  /> -->
<Label for="attachments">
  <Icon name="paperclip" />
  Attachments
</Label>
<CustomInput
  type="file"
  {name}
  {accept}
  on:input={addAttachmentToDatabase}
  on:change={previewFiles}
  {multiple}
  {disabled}
/>
<!-- </label> -->

{#if attachments.length}
  <ul id="preview">
    {#each attachments as file (file._id)}
      <li class:is-image={isImage} style={imagePreviewStyle(file)}>
        <a href={file.data.path} target="_blank">{file.data.filename}</a>
        <button on:click={() => deleteAttachment(file._id)}> Delete </button>
      </li>
    {/each}
  </ul>
{/if}

<style>
  /* .is-image {
    height: auto;
    width: 100%;
    background-size: 100% auto;
    background-repeat: no-repeat;
  } */
  label {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: left;
    background-size: contain;
    color: black;
    padding: 0 1rem 0 0rem;
    height: 50px;
    min-width: 50px;
    border-radius: 25px;
  }
  label:hover {
    background-color: lightgray;
  }
  label.more {
    padding: 0;
  }
  label.error {
    color: red;
  }

  label input[type="file"] {
    position: absolute;
    left: 0;
    z-index: -1;
    width: 0;
    overflow: hidden;
    display: none;
  }
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

  ul li.is-image {
    padding-left: 50px;
  }
  ul li.is-image span {
    width: calc(280px - 50px - 2rem);
  }

  ul li span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: calc(280px - 2rem);
    font-size: 0.81rem;
    display: block;
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
</style>
