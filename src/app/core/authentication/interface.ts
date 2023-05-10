export interface User {
  [prop: string]: any;

  id?: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: any[];
  permissions?: any[];
}

interface TokenEssentials {
  accessToken: string;
}
interface TokenOptionals {
  [prop: string]: any;
  token_type: string;
  expires_in: number;
  exp: number;
  refreshToken: string;
}
export type Token = Required<TokenEssentials> & Partial<TokenOptionals>;
