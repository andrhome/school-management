import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sch-list-buttons-set',
  templateUrl: './list-buttons-set.component.html',
  styleUrls: ['./list-buttons-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListButtonsSetComponent implements OnInit {
  @Output() deleteItem = new EventEmitter<any>();
  @Output() showDetails = new EventEmitter<any>();
  @Input() item: {[key: string]: any};
  @Input() pageName: string;
  @Input() detailsInModal: boolean;

  constructor() { }

  ngOnInit() {
  }

  delete(item: {[key: string]: any}): void {
    this.deleteItem.emit(item);
  }

  showDetailsModal(item: {[key: string]: any}): void {
    this.showDetails.emit(item);
  }

}
