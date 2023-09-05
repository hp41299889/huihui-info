import { google } from "googleapis";

import { oauthConfig } from "@/util/config/config";

const { clientId, clientSecret, redirectUri } = oauthConfig;
const SCOPES = ["https://mail.google.com/"];

export const oauthClient = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri,
});

google.options({ auth: oauthClient });

export const oauth = async () => {
  const { credentials } = oauthClient;
  if (!credentials.access_token) {
    return oauthClient.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
  } else {
    return "oauth already ok";
  }
};
