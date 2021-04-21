import { newObjectIdString } from "./_database.js";

export async function get(_req, res, _next) {
  const objectId = newObjectIdString();

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify({ new_object_id: objectId }));
}

export async function post(req, res) {
  req.session.new_object_id = req.body.new_object_id;

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end();
}
