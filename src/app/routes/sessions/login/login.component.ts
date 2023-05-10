import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication';
import { AuthApplication } from 'app/routes/auth/application/auth-application';
import { AuthFactory } from 'app/routes/auth/domain/auth-factory';
import { filter } from 'rxjs/operators';

type VisibleInputPassword = 'password' | 'text';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isSubmitting = false;
  visiblePassword = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private authApplication: AuthApplication
  ) {
    this.loginForm = this.fb.nonNullable.group({
      //username: ['sergio@correo.com', [Validators.required]],
      //password: ['123', [Validators.required]],
      username: ['ng-matero', [Validators.required]],
      password: ['ng-matero', [Validators.required]],
      rememberMe: [false],
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  login() {
    //TODO: Eliminar este login y todo lo relacionado a el cuando finalice el curso de angular 14
    // Esto es solo para ensayar interceptors, storage, guards
    //this.loginAppAmbulance();

    this.isSubmitting = true;

    this.auth
      .login(this.username.value, this.password.value, this.rememberMe.value)
      .pipe(filter(authenticated => authenticated))
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.loginForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
          this.isSubmitting = false;
        },
      });
  }

  private loginAppAmbulance(): void {
    const credentials = {
      correo: 'sergio@correo.com',
      password: '12345',
    };
    const auth = AuthFactory.create(credentials.correo, credentials.password);

    this.authApplication.login(auth);
  }
}
