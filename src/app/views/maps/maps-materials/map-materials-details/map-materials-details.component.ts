import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapMaterialsType } from '@app/types/common.types';
import { Subject } from 'rxjs';
import { PluralItemsType, UnitItemType } from '@app/types/common.enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as mapMaterialsReducers from '@store/reducers/material-maps.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import * as actions from '@store/actions/material-maps.actions';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { MatDialog, MatTreeNestedDataSource } from '@angular/material';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-map-materials-details',
  templateUrl: './map-materials-details.component.html',
  styleUrls: ['./map-materials-details.component.scss']
})
export class MapMaterialsDetailsComponent implements OnInit, OnDestroy {
  currentMapMaterials: MapMaterialsType;
  currentMapMaterialsId: number;
  private readonly onDestroy = new Subject<void>();
  isLoading: boolean;
  unitItemType = UnitItemType;
  pluralItemsType = PluralItemsType;

  treeControl = new NestedTreeControl<any>(node => node.subjects || node.materials);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<mapMaterialsReducers.State>,
              private updates: Actions,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.initData();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  hasChild = (_: number, node: any) => {
    return (!!node.subjects && node.subjects.length) || (!!node.materials && node.materials.length);
  }

  private initData(): void {
    this.route.params
      .pipe(takeUntil(this.onDestroy))
      .subscribe(params => {
        if (params && params.id) {
          this.currentMapMaterialsId = +params.id;
          this.store.select(state => state.materialMaps)
            .pipe(takeUntil(this.onDestroy))
            .subscribe((res: { [key: string]: any }) => {
              if (res.materialMap.id === this.currentMapMaterialsId) {
                this.currentMapMaterials = res.materialMap;
              } else {
                this.currentMapMaterials = res.materialMaps.find(pupil => pupil.id === this.currentMapMaterialsId);
              }
            });

          if (this.currentMapMaterials && this.currentMapMaterials.id) {
            this.dataSource.data = this.currentMapMaterials.zones;
          } else {
            this.fetchMapMaterials();
          }

          this.updates.pipe(
            ofType(actions.MaterialMapActionType.GET_MATERIAL_MAP_SUCCESS,
              actions.MaterialMapActionType.GET_MATERIAL_MAP_FAILED),
            takeUntil(this.onDestroy))
            .subscribe(() => this.isLoading = false);
        }
      });
  }

  private fetchMapMaterials(): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetMaterialMap(this.currentMapMaterialsId));
    this.store.select(state => state.materialMaps)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((resp: { [key: string]: any }) => {
        this.isLoading = false;
        this.currentMapMaterials = resp.materialMap;
        this.dataSource.data = this.currentMapMaterials.zones;
      });
  }

  deleteMapMaterials(mapMaterials: MapMaterialsType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить карту материалов "${mapMaterials.name}" ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.store.dispatch(new actions.DeleteMaterialMap(mapMaterials));
        this.updates.pipe(ofType(actions.MaterialMapActionType.DELETE_MATERIAL_MAP_SUCCESS,
          actions.MaterialMapActionType.DELETE_MATERIAL_MAP_FAILED))
          .pipe(takeUntil(this.onDestroy))
          .subscribe(() => {
            this.router.navigate(['maps/maps-materials']);
          });
      }
    });
  }

}
