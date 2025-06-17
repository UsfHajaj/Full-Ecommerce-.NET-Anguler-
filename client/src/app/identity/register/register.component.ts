import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityModule } from '../identity.module';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private fp: FormBuilder,
    private _service: IdentityService,
    private tost: ToastrService,
    private rout:Router
  ) {}
  ngOnInit(): void {
    this.formValidation();
  }

  formValidation() {
    this.formGroup = this.fp.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required]],
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
  get _userName() {
    return this.formGroup.get('userName');
  }
  get _email() {
    return this.formGroup.get('email');
  }
  get _displayName() {
    return this.formGroup.get('displayName');
  }
  get _password() {
    return this.formGroup.get('password');
  }
  Submit() {
    if (this.formGroup.valid) {
      this._service.register(this.formGroup.value).subscribe({
        next: (value) => {
          console.log(value);
          this.tost.success('success', 'success');
          this.rout.navigateByUrl('/account/login')
        },
        error: (err: any) => {
          console.log(err);
          this.tost.error(err.error.message, 'Error');
        },
      });
    }
  }
}
