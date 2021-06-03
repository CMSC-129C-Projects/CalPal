import { deleteAttachmentsOfCard } from "../../../../_database.js";

export async function del(req, res) {
  const { cardId } = req.params;

  await deleteAttachmentsOfCard(cardId);

  res.end();
}
