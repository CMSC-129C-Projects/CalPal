<script>
  import { CustomInput, Label, Icon } from "sveltestrap/src";
  let attachments = [],
    name = "attachments",
    accept = ".svg, .jpg, .png, .gif, .doc, .docx, .pdf, .txt",
    error = false,
    multiple = "true",
    disabled = false;

  const isImage = (string) => /\.(jpe?g|pn?g|gi?f|sv?g)$/i.test(string);
  const imagePreviewStyle = (file) =>
    isImage(file.filename) ? `background-image: url('${file.path}');` : "";

  function previewFiles(e) {
    error = false;
    function readAndPreview(file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log(file);
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
  $: console.debug(JSON.stringify(attachments));
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
  on:input
  on:change={previewFiles}
  {multiple}
  {disabled}
/>
<!-- </label> -->

{#if attachments.length}
  <ul id="preview">
    {#each attachments as file, i (file.filename)}
      <li
        href={file.path}
        class:is-image={isImage}
        style={imagePreviewStyle(file)}
      >
        <span>{file.filename}</span>
        <button on:click={() => deleteAttachment(i)}> Delete </button>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .is-image {
    max-width: 100px;
    max-height: 100px;
  }
</style>
