import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'sch-list-nav',
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListNavComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() btnText: string;
  @Input() link: string;
  @Input() itemsAmount: number;
  @Input() perPage: number;
  @Output() searchHandler: EventEmitter<any> = new EventEmitter();
  @Output() paginationHandler: EventEmitter<any> = new EventEmitter();
  onSearch: Subject<string> = new Subject();
  isSearchBlock: boolean;

  constructor() { }

  ngOnInit() {
    this.onSearch.pipe(
        debounceTime(600),
        distinctUntilChanged()
      ).subscribe(this.applySearch.bind(this));
  }

  ngOnDestroy() {
    this.onSearch.unsubscribe();
  }

  toggleSearchBar(): void {
    this.isSearchBlock = !this.isSearchBlock;
  }

  applySearch(value: string): void {
    this.searchHandler.emit(value);
  }

  changePage(value: number): void {
    this.paginationHandler.emit(value);
  }

}
