import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetoptCardMoveComponent } from './netopt-card-move.component';
import { InputTableComponent } from './input-table/input-table.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [{ path: '', component: NetoptCardMoveComponent }];

@NgModule({
  declarations: [NetoptCardMoveComponent, InputTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class NetoptCardMoveModule { }
