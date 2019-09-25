import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { ILogin } from '../../shared/interfaces/userInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isFormValid = false;
  loginMode = true;
  formValidSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.authService.currentUserChanged.subscribe(currentUser => {
      if (currentUser) {
        this.authService.findHomePage();
      }
    });

    this.initForm();
    this.formValidSubscription = this.loginForm.statusChanges.subscribe(status => {
      status === 'VALID' ? (this.isFormValid = true) : (this.isFormValid = false);
    });
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginObject: ILogin = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authService.login(loginObject);
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  ngOnDestroy() {
    this.formValidSubscription.unsubscribe();
  }
}
