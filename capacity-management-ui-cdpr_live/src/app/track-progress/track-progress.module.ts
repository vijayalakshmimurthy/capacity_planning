import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TrackProgressComponent } from './track-progress.component';
import { TrackProgressTableComponent } from './track-progress-table/track-progress-table.component';
const routes: Routes = [{ path: '', component: TrackProgressComponent}];


@NgModule({
    declarations: [TrackProgressComponent, TrackProgressTableComponent],
    imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild(routes)
    ]
  })
  export class TrackprogressModule { }