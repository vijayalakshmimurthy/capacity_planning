import { RoleService } from './services/roles.service';
import { MapService } from './services/map-service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SvgComponent } from './components/svg/svg.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { FilterComponent } from './components/filter/filter.component';
import { CustomLocationComponent } from './components/custom-location/custom-location.component';
import { CSVDownloadDirective } from './directives/download-csv-directive';
import { PNGDownloadDirective } from './directives/download-png-directive';
import { AppService } from './services/app-service';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { environment } from './../../environments/environment';
import { LogoutComponent } from './components/logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './components/table/table.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { AlertComponent } from './components/alert/alert.component';
import { AutoSuggestionsComponent } from './components/auto-suggestions/auto-suggestions.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { LoaderComponent } from './components/loader/loader.component';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { CardmoveWorkflowComponent } from './components/cardmove-workflow/cardmove-workflow.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import {MultiSelectModule} from 'primeng/multiselect';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { TooltipModule } from 'primeng/tooltip';
import { NocardmoveWorkflowComponent } from './components/nocardmove-workflow/nocardmove-workflow.component';
import { DeviceRecoveryWorkflowComponent } from './components/device-recovery-workflow/device-recovery-workflow.component';
import { NoHeaderComponent } from './components/no-header/no-header.component';
/** This module is share module */
@NgModule({
  /** All declaration, imports, exports, providers gives here */
  declarations: [HeaderComponent, SvgComponent, MapViewComponent,
    FilterComponent, CustomLocationComponent, CSVDownloadDirective, LogoutComponent, TableComponent,
    FileUploadComponent, AutoSuggestionsComponent, AlertComponent, ChartComponent, PNGDownloadDirective, LoaderComponent,
    ModalPopupComponent, CardmoveWorkflowComponent, FileUploaderComponent, NocardmoveWorkflowComponent, 
    DeviceRecoveryWorkflowComponent, NoHeaderComponent],
  imports: [
    CommonModule,
    AccordionModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    DynamicDialogModule,
    DialogModule,
    KeyFilterModule,
    NgbModule,
    AutoCompleteModule,
    TableModule,
    PaginatorModule,
    ChartModule,
    TabViewModule,
    CalendarModule,
    CheckboxModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    MultiSelectModule,
    TooltipModule,
    RadioButtonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_key
    })
  ],
  providers: [AppService, MapService, RoleService],
  exports: [NgbModule, TableModule, HeaderComponent, SvgComponent, MapViewComponent, FilterComponent, CustomLocationComponent,
    CSVDownloadDirective, DialogModule, AutoSuggestionsComponent, FileUploadComponent, TableComponent,
    AlertComponent, ChartComponent, PNGDownloadDirective, TabViewModule, LoaderComponent, CalendarModule, CheckboxModule, DropdownModule,
    FormsModule, ReactiveFormsModule, ModalPopupComponent, AutoCompleteModule, InputTextModule,
    CardmoveWorkflowComponent, ToastModule, PaginatorModule, FileUploaderComponent, TooltipModule, RadioButtonModule,
    NocardmoveWorkflowComponent, DeviceRecoveryWorkflowComponent, NoHeaderComponent]
})
export class SharedModule { }
