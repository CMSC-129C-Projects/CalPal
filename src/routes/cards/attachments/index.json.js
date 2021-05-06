import { insertAttachment } from "../_database.js";
import { ObjectId } from "mongodb";

export async function post(req, res) {
  const newAttachment = req.body.attachment;
  newAttachment._id = ObjectId(newAttachment._id);

  const result = await insertAttachment(newAttachment);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(result));
}
