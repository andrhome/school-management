import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-default-items-list',
  templateUrl: './default-items-list.component.html',
  styleUrls: ['./default-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultItemsListComponent implements OnInit {
  @Output() deleteItem = new EventEmitter<any>();
  @Output() showDetails = new EventEmitter<any>();
  @Input() itemsList = [];
  @Input() pageName: string;
  @Input() paginationParams: {[key: string]: any} = {
    page: 1,
    perPage: 20,
    total: 0
  };
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
