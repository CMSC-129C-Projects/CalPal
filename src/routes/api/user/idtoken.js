import { userIdFromIdToken } from "./_verify-id-token";

export async function post(req, res) {
  const { idToken } = req.body;

  console.debug("/api/user/idtoken");
  console.debug(idToken);

  const userId = await userIdFromIdToken(idToken);

  res.end(userId);
}
