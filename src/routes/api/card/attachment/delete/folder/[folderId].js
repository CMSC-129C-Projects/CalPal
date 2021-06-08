import { deleteAttachmentsinFolder } from "../../../../_database.js";

export async function del(req, res) {
  const { folderId } = req.params;
  const userId = req.body.user_id;
  //   console.debug(userId);

  //   console.debug(folderId);

  await deleteAttachmentsinFolder(userId, folderId);

  res.end();
}
