import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCenterComponent } from './data-center.component';
import { Routes, RouterModule } from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SharedModule } from '../shared/shared.module';
/** This is the Data Center module whcih contains all Map funtionality of the STT requirement */
const routes: Routes = [{path: '', component: DataCenterComponent}];

@NgModule({
  declarations: [DataCenterComponent],
  imports: [
    CommonModule,
    TabViewModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class DataCenterModule { }
