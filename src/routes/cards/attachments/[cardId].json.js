import { getAttachmentsOfCard, insertAttachmentToCard } from "../_database.js";

export async function get(req, res, next) {
  const { cardId } = req.params;

  const attachments = await getAttachmentsOfCard(cardId);
  if (attachments.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(attachments));
  } else {
    console.error(`Could not get attachments of card ${cardId}`);
    next();
  }
}

export async function post(req, res) {
  const { cardId } = req.params;
  const newAttachment = req.body.attachment;

  const result = await insertAttachmentToCard(cardId, newAttachment);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(result));
}
