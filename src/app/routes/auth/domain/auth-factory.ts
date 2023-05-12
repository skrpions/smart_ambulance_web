import { Auth, AuthProperties } from './auth';

export class AuthFactory {
  static create(correo: string, password: string): Auth {
    const recaptchaReactive = '6LcqVe8cAAAAAFKrdDeUow8MCAXl4XGMsm7XbS-T';
    const authProperties: AuthProperties = {
      correo,
      password,
      recaptchaReactive,
    };

    // Reglas del negocio
    if (correo.trim() === '') {
      throw new Error('Please enter email');
    }
    if (password.trim() === '') {
      throw new Error('Please enter password');
    }

    return new Auth(authProperties);
  }
}
