import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapsComponent } from '@views/maps/maps.component';
import { MapsMaterialsComponent } from '@views/maps/maps-materials/maps-materials.component';
import { AddMapMaterialsComponent } from '@views/maps/maps-materials/add-map-materials/add-map-materials.component';
import { MapMaterialsDetailsComponent } from '@views/maps/maps-materials/map-materials-details/map-materials-details.component';

const routes: Routes = [
  {
    path: '',
    component: MapsComponent,
    data: {
      title: 'Карты'
    },
    children: [
      {
        path: 'maps-materials',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: MapsMaterialsComponent,
          },
          {
            path: 'add',
            component: AddMapMaterialsComponent
          },
          {
            path: ':id',
            component: MapMaterialsDetailsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
