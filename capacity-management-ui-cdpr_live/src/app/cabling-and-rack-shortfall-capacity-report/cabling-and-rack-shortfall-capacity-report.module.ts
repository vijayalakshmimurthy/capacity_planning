import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CablingAndRackShortfallCapacityReportComponent } from './cabling-and-rack-shortfall-capacity-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { InfoModelCrsrComponent } from './info-model-crsr/info-model-crsr.component';

const routes: Routes = [{ path: '', component: CablingAndRackShortfallCapacityReportComponent }];

@NgModule({
  declarations: [CablingAndRackShortfallCapacityReportComponent, InfoModelCrsrComponent],
  imports: [
    CommonModule,
    SharedModule,
    MultiSelectModule,
    DialogModule,
    FormsModule,
    AccordionModule,
    RouterModule.forChild(routes),
  ]
})
export class CablingAndRackShortfallCapacityReportModule { }
