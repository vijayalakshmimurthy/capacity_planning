import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardmoveSummaryComponent } from './cardmove-summary.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TabViewModule } from 'primeng/tabview';

const routes: Routes = [{ path: '', component: CardmoveSummaryComponent }];
@NgModule({
  declarations: [CardmoveSummaryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TabViewModule
  ]
})
export class CardMoveSummaryModule { }