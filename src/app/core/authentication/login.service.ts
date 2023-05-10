import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '@core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token, User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}

  login(username: string, password: string, rememberMe?: boolean): Observable<Token> {
    const auth = {
      correo: username,
      password,
      rememberMe: false,
    };
    console.log('auth: ', auth);

    //return this.http.post<Token>('https://api-cursoangular.cursos-dev.com/users/login', auth);
    return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  }

  refresh(params: Record<string, any>): Observable<Token> {
    console.log('params: ', params);

    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
