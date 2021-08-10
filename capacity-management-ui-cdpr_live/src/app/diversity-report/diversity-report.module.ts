import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiversityReportComponent } from './diversity-report.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { InfoDiversityComponent } from './info-diversity/info-diversity.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DiversityReportTableComponent } from './diversity-report-table/diversity-report-table.component';
import { TableModule } from 'primeng/table';
const routes: Routes = [{ path: '', component: DiversityReportComponent}];


@NgModule({
  declarations: [DiversityReportComponent, SearchFilterComponent, InfoDiversityComponent, DiversityReportTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    AutoCompleteModule,
    TableModule,
    RouterModule.forChild(routes),
  ]
})
export class DiversityReportModule { }
