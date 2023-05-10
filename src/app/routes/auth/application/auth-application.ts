import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../domain/auth';

import { StorageRepository } from '../domain/storage-repository';

import { Observable } from 'rxjs';
import { ITokens } from '../domain/entities/tokens-entity';
import { AuthRepository } from '../domain/repositories/auth-repository';
import { AuthInfrastructure } from '../infrastructure/auth-infrastructure';
import { StorageInfrastructure } from '../infrastructure/storage-infrastructure';

@Injectable()
export class AuthApplication {
  private userLogged = false;

  constructor(
    @Inject(AuthInfrastructure) private readonly authRepository: AuthRepository,
    @Inject(StorageInfrastructure) private readonly storageRepository: StorageRepository,
    private router: Router
  ) {}

  login(auth: Auth) {
    this.authRepository.login(auth).subscribe({
      next: this.userAuthenticated.bind(this),
      error: this.showMessageError,
    });
  }

  private userAuthenticated(response: ITokens) {
    //console.log('✅ Teto', response);

    this.storageRepository.set('accessToken-test', response.accessToken);
    this.storageRepository.set('refreshToken-test', response.refreshToken);

    this.userLogged = true;
    this.router.navigateByUrl('/');
  }

  private showMessageError(error: any) {
    console.log('Error: ', error);
  }

  get isUserLogged(): boolean {
    const accessToken = this.storageRepository.get('accessToken-test');

    return !!accessToken || this.userLogged;
  }

  logout() {
    this.userLogged = false;
    this.storageRepository.clear();
    //this.router.navigate(['/auth/login']);
    this.router.parseUrl('/auth/login');
  }

  getNewAccessToken(refreshToken: string): Observable<ITokens> {
    return this.authRepository.getNewAccessToken(refreshToken);
  }
}
