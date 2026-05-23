export interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  expires?: number;
}

export const emptyAccessToken: Readonly<AccessToken> = {
  access_token: "emptyAccessToken",
  token_type: "",
  expires_in: 0,
  refresh_token: "",
  expires: -1,
};

export function isEmptyAccessToken(value: any): boolean {
  return value === emptyAccessToken;
}
