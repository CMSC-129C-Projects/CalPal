import { OAuth2Client } from "google-auth-library";

const { GOOGLE_OAUTH2_CLIENT_ID } = process.env;

export async function userIdFromIdToken(idToken) {
  const client = new OAuth2Client(GOOGLE_OAUTH2_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: GOOGLE_OAUTH2_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userId = payload["sub"];

  return userId;
}
