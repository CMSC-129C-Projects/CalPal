import { userIdFromIdToken } from "./_verify-id-token";

export async function post(req, res) {
  const { idToken } = req.body;

  const userId = await userIdFromIdToken(idToken);

  res.end(userId);
}
