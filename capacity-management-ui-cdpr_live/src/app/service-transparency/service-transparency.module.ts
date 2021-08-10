import { Routes, RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTransparencyComponent } from './service-transparency.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { AccordionModule } from 'primeng/accordion';
const routes: Routes = [{path: '', component: ServiceTransparencyComponent}];
/** This is the STT module whcih contains all Map funtionality of the STT requirement */
@NgModule({
  declarations: [ServiceTransparencyComponent, InfoModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    AutoCompleteModule,
    FormsModule,
    NgbModule,
    AccordionModule
  ],
  providers: []
})
export class SttModule { }
