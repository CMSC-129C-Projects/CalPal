import { deleteAttachmentsinList } from "../../../../_database.js";

export async function del(req, res) {
  const { listId } = req.params;
  const userId = req.body.user_id;

  await deleteAttachmentsinList(userId, listId);

  res.end();
}
