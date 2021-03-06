import { getAttachmentsOfCard } from "../../_database.js";

export async function get(req, res, next) {
  const { cardId } = req.params;

  const attachments = await getAttachmentsOfCard(cardId);
  if (attachments.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(attachments));
  } else {
    console.log(`Could not get attachments of card ${cardId}`);
    next();
  }
}
