import { google } from "googleapis";

import { oauthConfig } from "@/util/config/config";
import { SendEmail } from "./interface";

const { clientId, clientSecret, redirectUri } = oauthConfig;
const gmail = google.gmail("v1");
const SCOPES = ["https://mail.google.com/"];

export const oauthClient = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri,
});

google.options({ auth: oauthClient });

export const sendMail = async (payload: SendEmail) => {
  const { credentials } = oauthClient;
  if (!credentials.access_token) {
    const url = oauthClient.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    return url;
  } else {
    const res = await send(payload);
    return res;
  }
};

const send = async (payload: SendEmail) => {
  const subject = "huihui-info-合作聯絡";
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const messageParts = [
    `From: ${oauthConfig.gmailFrom}`,
    `To: ${oauthConfig.gmailTo}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${utf8Subject}`,
    "",
    payload.content,
  ];
  const message = messageParts.join("\n");
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encodedMessage },
  });
  return res.data;
};
