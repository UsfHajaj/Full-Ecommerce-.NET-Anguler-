import { AfterViewInit, Component } from '@angular/core';
import { ActiveAccount } from '../../shared/models/ActiveAccount';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrl: './active.component.scss',
})
export class ActiveComponent implements AfterViewInit {
  activePram = new ActiveAccount();
  constructor(
    private router: ActivatedRoute,
    private _service: IdentityService,
    private tost: ToastrService,
    private rout:Router
  ) {}
  ngAfterViewInit(): void {
    this.router.queryParams.subscribe((param) => {
      this.activePram.email = param['email'];
      this.activePram.token = param['code'];
    });
    this._service.active(this.activePram).subscribe({
      next: (value) => {
        console.log(value);
        this.tost.success('Activte is success', 'success');
        this.rout.navigateByUrl('/account/login')
      },
      error: (err) => {
        console.log(err);
        this.tost.error('Error While Activite', 'Error');
      },
    });
  }
}
