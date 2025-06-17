import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../../shared/models/ResetPasword';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  resetValue = new ResetPassword();
  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private _service: IdentityService,
    private route:Router
  ) {}
  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      this.resetValue.email = param['email'];
      this.resetValue.token = param['code'];
    });
    this.formValidate();
  }
  formValidate() {
    this.formGroup = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            ),
          ],
        ],
      },
      {
        validator: this.passwordMathchValidation,
      }
    );
  }
  passwordMathchValidation(form: FormGroup) {
    const passwordControler = form.get('password');
    const confirmPasswordControler = form.get('confirmPassword');
    if (passwordControler?.value === confirmPasswordControler?.value) {
      confirmPasswordControler?.setErrors(null);
    } else {
      confirmPasswordControler?.setErrors({ passwordMisMatch: true });
    }
  }
  get _password() {
    return this.formGroup.get('password');
  }
  get _confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }
  Submit() {
    if (this.formGroup.valid) {
      this.resetValue.password=this.formGroup.value.password
      this._service.ResetPassword(this.resetValue).subscribe({
        next: () => {
          this.route.navigateByUrl('/account/login')
        },
        error(err) {
          console.log(err);
        }
      })
    }
  }
}
