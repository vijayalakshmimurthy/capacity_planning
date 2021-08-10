import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetoptSneRecoveryComponent } from './netopt-sne-recovery.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { InputTableComponent } from './input-table/input-table.component';
const routes: Routes = [{ path: '', component: NetoptSneRecoveryComponent }];

@NgModule({
  declarations: [NetoptSneRecoveryComponent, InputTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class NetoptSneRecoveryModule { }
