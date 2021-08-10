import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SrimsVisualizerModule } from '@BT/srims-visualizer';
import { Routes, RouterModule } from '@angular/router';
import { Three60TwodComponent } from './three60-twod.component';
import { Three60HeaderComponent } from './three60-header/three60-header.component';
import { Three60RightPanelComponent } from './three60-right-panel/three60-right-panel.component';
import { TableModule } from 'primeng/table';
import { TwoddynamicComponent } from './twoddynamic/twoddynamic.component';
import { DynamicpopupcompnentComponent } from './dynamicpopupcompnent/dynamicpopupcompnent.component';
import { SatellitedataComponent } from './satellitedata/satellitedata.component';
import {MultiSelectModule} from 'primeng/multiselect';

const routes: Routes = [{ path: '', component: Three60TwodComponent }];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [Three60TwodComponent, Three60HeaderComponent, Three60RightPanelComponent, TwoddynamicComponent, DynamicpopupcompnentComponent, SatellitedataComponent],
  imports: [
    CommonModule,
    TableModule,
    MultiSelectModule,
    SharedModule,
    SrimsVisualizerModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [TwoddynamicComponent, DynamicpopupcompnentComponent, SatellitedataComponent]
})
export class Three60TwodModule { }
