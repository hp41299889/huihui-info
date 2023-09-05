import { google } from "googleapis";

import { oauthConfig } from "@/util/config/config";

const gmail = google.gmail("v1");

export const sendMail = async (
  subject: string,
  content: string,
  type: "contact" | "register",
  to?: string,
  name?: string
) => {
  if (type === "contact") {
    return await sendContact(subject, content);
  }
  if (type === "register" && to && name) {
    return await sendRegister(subject, content, to, name);
  }
};

const sendContact = async (subject: string, content: string) => {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const messageParts = [
    `From: ${oauthConfig.gmailFrom}`,
    `To: ${oauthConfig.gmailTo}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${utf8Subject}`,
    "",
    content,
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

const sendRegister = async (
  subject: string,
  content: string,
  to: string,
  name: string
) => {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const messageParts = [
    `From: ${oauthConfig.gmailFrom}`,
    `To: ${name} <${to}>`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${utf8Subject}`,
    "",
    content,
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
