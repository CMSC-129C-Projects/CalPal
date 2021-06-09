import { deleteAttachmentsInFolder } from "../../../../_database.js";

export async function del(req, res) {
  const { folderId } = req.params;
  const userId = req.body.user_id;

  await deleteAttachmentsInFolder(userId, folderId);

  res.end();
}
