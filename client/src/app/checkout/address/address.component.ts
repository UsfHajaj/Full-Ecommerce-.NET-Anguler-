import { Component, Input, input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  canEdit:boolean=false
  constructor(private _service: CheckoutService) {}
  ngOnInit(): void {
    this._service.getUserAdderss().subscribe({
      next: (value) => {
        this.address.patchValue(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  @Input() address: FormGroup;
  uppdateAdderss() {
    if (this.address.valid) {
      this._service.uppdateAdderss(this.address.value).subscribe({
        next: (value) => {
          console.log(value);
        },
        error(err) {
          console.log(err.error.errors);
        },
      });
    }
  }
}
