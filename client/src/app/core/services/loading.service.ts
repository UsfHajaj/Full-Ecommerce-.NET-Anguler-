import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  reqCount = 0;
  constructor(private _service: NgxSpinnerService) {}

  loading() {
    this.reqCount++;
    this._service.show(undefined, {
      bdColor: "rgba(0,0,0,0.3)",
      size: "medium",
      color: '#2563eb',
      type: 'ball-pulse-sync',
      fullScreen : true,
    });
  }
  hideLoader() {
    this.reqCount--;
    if (this.reqCount <= 0) {
      this.reqCount = 0
      this._service.hide()
    }
  }
}
