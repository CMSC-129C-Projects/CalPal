import { deleteAttachment } from "../../../_database.js";
import { ObjectId } from "mongodb";

export async function del(req, res) {
  const { attachmentId } = req.params;

  await deleteAttachment(ObjectId(attachmentId));

  res.end();
}
