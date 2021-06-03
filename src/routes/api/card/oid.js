import { newObjectIdString } from "../_database.js";

export async function get(_req, res, _next) {
  const objectId = newObjectIdString();

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end(objectId);
}
