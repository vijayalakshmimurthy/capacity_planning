import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { ChassisViewerComponent } from './chassis-viewer.component';
import { SharedModule } from '../shared/shared.module';
import { SrimsVisualizerModule } from '@BT/srims-visualizer';
import { ChassisLeftPanelComponent } from './chassis-left-panel/chassis-left-panel.component';
import { ChassisRightPanelComponent } from './chassis-right-panel/chassis-right-panel.component';
import { ChassisHeaderComponent } from './chassis-header/chassis-header.component';
import { SrimsNavigatorModule } from '@BT/srims-navigator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChassisActionComponent } from './chassis-header/chassis-action/chassis-action.component';
// tslint:disable-next-line:max-line-length
import { ChassisActionReservationComponent } from './chassis-header/chassis-action/chassis-action-reservation/chassis-action-reservation.component';
// tslint:disable-next-line:max-line-length
import { ChassisActionUnreservationComponent } from './chassis-header/chassis-action/chassis-action-unreservation/chassis-action-unreservation.component';
import { ChassisActionUsageComponent } from './chassis-header/chassis-action/chassis-action-usage/chassis-action-usage.component';
import { ChassisActionPlanComponent } from './chassis-header/chassis-action/chassis-action-plan/chassis-action-plan.component';
import {TreeModule} from 'primeng/tree';

const routes: Routes = [{ path: '', component: ChassisViewerComponent }];

@NgModule({
  declarations: [ChassisViewerComponent, ChassisLeftPanelComponent, ChassisRightPanelComponent,
    ChassisHeaderComponent, ChassisActionComponent, ChassisActionReservationComponent,
    ChassisActionUnreservationComponent, ChassisActionUsageComponent, ChassisActionPlanComponent],
  imports: [
    TreeModule,
    OverlayPanelModule,
    TableModule,
    CommonModule,
    SharedModule,
    SrimsVisualizerModule,
    SrimsNavigatorModule,
    SidebarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ChassisViewerModule { }
