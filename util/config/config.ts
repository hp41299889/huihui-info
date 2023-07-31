import "dotenv/config";

const { env } = process;

interface ServerConfig {
  baseUrl: string;
}

interface AuthConfig {
  baseUrl: string;
  jwtSecret: string;
  username: string;
  password: string;
}

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  gmailFrom: string;
  gmailTo: string;
}

export const serverConfig: ServerConfig = {
  baseUrl: env.SERVER_BASE_URL || "",
};

export const authConfig: AuthConfig = {
  baseUrl: env.NEXT_PUBLIC_AUTH_BASEURL || "",
  jwtSecret: env.NEXT_PUBLIC_AUTH_JWTSECRET || "",
  username: env.NEXT_PUBLIC_AUTH_USERNAME || "",
  password: env.NEXT_PUBLIC_AUTH_PASSWORD || "",
};

export const oauthConfig: OAuthConfig = {
  clientId: env.GOOGLE_OAUTH_CLIENT_ID || "",
  clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET || "",
  redirectUri: env.GOOGLE_OAUTH_REDIRECT_URI || "",
  gmailFrom: env.GOOGLE_GMAIL_FROM || "",
  gmailTo: env.GOOGLE_GMAIL_TO || "",
};
