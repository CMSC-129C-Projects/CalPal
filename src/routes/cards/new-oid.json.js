import { newObjectIdString } from "./_database.js";

export async function get(_req, res, _next) {
  const objectId = newObjectIdString();

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify({ new_object_id: objectId }));
}
