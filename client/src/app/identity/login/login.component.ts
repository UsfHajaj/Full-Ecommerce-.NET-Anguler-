import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';
import { validate } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  emailModel: string = '';
  constructor(
    private fb: FormBuilder,
    private _service: IdentityService,
    private tost: ToastrService,
    private rout:Router
  ) {}
  ngOnInit(): void {
    this.formValidation();
  }
  formValidation() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          ),
        ],
      ],
    });
  }
  get _email() {
    return this.formGroup.get('email');
  }
  get _password() {
    return this.formGroup.get('password');
  }
  Submit() {
    if (this.formGroup.valid) {
      this._service.Login(this.formGroup.value).subscribe({
        next: (res) => {
          console.log(res);
          this.tost.success('success', 'success');
          this.rout.navigateByUrl('/')
          localStorage.setItem('tokenLogIn', res['token']);

        },
        error: (err) => {
          console.log(err);
          this.tost.error(err.error.message, 'Error');
        },
      });
    }
  }
  sendEmailForgetPassword() {
    this._service.ForGetPassword(this.emailModel).subscribe({
      next: (value) => {
        console.log(value);

      },
      error(err) {
        console.log(err);
      },
    });
  }
}
