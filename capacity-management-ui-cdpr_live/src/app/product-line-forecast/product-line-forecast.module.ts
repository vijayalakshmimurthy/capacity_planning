import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLineForecastComponent } from './product-line-forecast.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TabViewModule } from 'primeng/tabview';


const routes: Routes = [{ path: '', component: ProductLineForecastComponent }];

@NgModule({
  declarations: [ProductLineForecastComponent],
  imports: [
    CommonModule,
    TabViewModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ProductLineForecastModule { }
