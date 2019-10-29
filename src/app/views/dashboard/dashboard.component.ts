import { Component, OnInit } from '@angular/core';
import * as actionsCategory from '@store/actions/age-category.actions';
import { Store } from '@ngrx/store';
import * as ageCategoriesReducers from '@store/reducers/age-category.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private storeAgeCategories: Store<ageCategoriesReducers.State>) { }

  ngOnInit() {
    const defParams = {
      page: 1,
      perPage: 100
    };
    this.storeAgeCategories.dispatch(new actionsCategory.GetAgeCategories(defParams));
  }

}
