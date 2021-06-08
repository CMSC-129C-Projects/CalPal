import { deleteAttachmentsinFolder } from "../../../../_database.js";

export async function del(req, res) {
  const { folderId } = req.params;
  const userId = req.body.user_id;

  await deleteAttachmentsinFolder(userId, folderId);

  res.end();
}
