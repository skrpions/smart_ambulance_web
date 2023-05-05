import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRepository {
  login(auth: Auth): Observable<ITokens>;
  getNewAccessToken(refreshToken: string): Observable<ITokens>;
}
