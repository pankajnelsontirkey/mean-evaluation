import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ILogin } from 'src/app/shared/interfaces/userInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isFormValid = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
    this.loginForm.statusChanges.subscribe(status => {
      this.isFormValid = status;
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
}
