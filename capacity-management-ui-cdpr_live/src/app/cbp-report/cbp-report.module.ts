import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbpReportComponent } from './cbp-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CbpHeaderComponent } from './cbp-header/cbp-header.component';
import { RackPopupComponent } from './rack-popup/rack-popup.component';
import { OptimizationComponent } from './optimization/optimization.component';
/** cbp
 * @author Viji
 */

const routes: Routes = [{ path: '', component: CbpReportComponent }];

@NgModule({
  declarations: [CbpReportComponent, CbpHeaderComponent, RackPopupComponent, OptimizationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [
    RackPopupComponent
  ],
})
export class CbpReportModule { }
