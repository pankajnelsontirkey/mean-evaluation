import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IRegister } from '../../shared/interfaces/userInterface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  error: boolean = null;
  errorDetails: {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
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
}