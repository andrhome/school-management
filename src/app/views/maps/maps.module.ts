import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsRoutingModule } from './maps-routing.module';
import { SharedComponentsModule } from '@components/shared-components.module';
import { MapsComponent } from './maps.component';
import { MapsMaterialsComponent } from '@views/maps/maps-materials/maps-materials.component';
import { AddMapMaterialsComponent } from '@views/maps/maps-materials/add-map-materials/add-map-materials.component';
import { MapMaterialsDetailsComponent } from '@views/maps/maps-materials/map-materials-details/map-materials-details.component';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    MapsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MapsComponent,
    MapsMaterialsComponent,
    AddMapMaterialsComponent,
    MapMaterialsDetailsComponent
  ],
  entryComponents: [
    ConfirmComponent,
  ]
})
export class MapsModule { }
