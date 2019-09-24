import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { IRegister } from '../../shared/interfaces/userInterface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  error: boolean = null;
  errorDetails: {};
  isFormValid = false;
  formValidSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initForm();
    this.formValidSubscription = this.registrationForm.statusChanges.subscribe(
      status => {
        status === 'VALID'
          ? (this.isFormValid = true)
          : (this.isFormValid = false);
      }
    );
  }

  initForm() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      cpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    });
  }

  onSubmit() {
    const registerObject: IRegister = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    };
    this.authService.register(registerObject);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.formValidSubscription.unsubscribe();
  }
}
