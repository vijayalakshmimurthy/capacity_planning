import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NoSneRecoveryOverviewComponent} from './no-sne-recovery-overview.component';
import { InputTableComponent } from './input-table/input-table.component';

const routes: Routes = [{ path: '', component: NoSneRecoveryOverviewComponent}];


@NgModule({
  declarations: [NoSneRecoveryOverviewComponent, InputTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class NoSneRecoveryOverviewModule { }
