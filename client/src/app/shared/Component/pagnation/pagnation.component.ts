import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-pagnation',
  templateUrl: './pagnation.component.html',
  styleUrl: './pagnation.component.scss',
})
export class PagnationComponent {
  @Input() PageSize: number;
  @Input() totalCount: number;
 @Output() pageChanged=new EventEmitter()
  onChangePage(event:any) {
    this.pageChanged.emit(event)
  }
}
