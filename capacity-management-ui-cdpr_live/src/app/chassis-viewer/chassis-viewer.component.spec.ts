import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChassisViewerComponent } from './chassis-viewer.component';
import { ChassisLeftPanelComponent } from './chassis-left-panel/chassis-left-panel.component';
import { ChassisRightPanelComponent } from './chassis-right-panel/chassis-right-panel.component';
import { ChassisHeaderComponent } from './chassis-header/chassis-header.component';
import { ChassisActionComponent } from './chassis-header/chassis-action/chassis-action.component';
// tslint:disable-next-line:max-line-length
import { ChassisActionReservationComponent } from './chassis-header/chassis-action/chassis-action-reservation/chassis-action-reservation.component';
// tslint:disable-next-line:max-line-length
import { ChassisActionUnreservationComponent } from './chassis-header/chassis-action/chassis-action-unreservation/chassis-action-unreservation.component';
import { ChassisActionUsageComponent } from './chassis-header/chassis-action/chassis-action-usage/chassis-action-usage.component';
import { ChassisActionPlanComponent } from './chassis-header/chassis-action/chassis-action-plan/chassis-action-plan.component';
import { SrimsNavigatorModule } from '@BT/srims-navigator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SrimsVisualizerModule } from '@BT/srims-visualizer';
import { Router, RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { AppService } from '../shared/services/app-service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ChassisViewerComponent', () => {
  let component: ChassisViewerComponent;
  let fixture: ComponentFixture<ChassisViewerComponent>;
  let router: Router;
  // tslint:disable-next-line:prefer-const
  let service: AppService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OverlayPanelModule, TableModule, SharedModule, SrimsVisualizerModule, SrimsNavigatorModule,
        SidebarModule, DropdownModule, FormsModule, ReactiveFormsModule, RouterModule.forChild([])
      ],
      declarations: [ChassisViewerComponent, ChassisRightPanelComponent, ChassisLeftPanelComponent,
        ChassisHeaderComponent, ChassisActionComponent, ChassisActionReservationComponent, ChassisActionPlanComponent,
        ChassisActionUnreservationComponent, ChassisActionUsageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: router },
      ]
    })
      .compileComponents();
    service = TestBed.get(AppService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChassisViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  /*it('should call load3dDataBySNE', () => {
    spyOn(component, 'load3dDataBySNE').and.callThrough();
    component.load3dDataBySNE(602232);
    fixture.detectChanges();
    expect(component.load3dDataBySNE).toHaveBeenCalled();
  });

  it('should call loadChassisByIndex', () => {
    spyOn(component, 'loadChassisByIndex').and.callThrough();
    component.loadChassisByIndex(0);
    fixture.detectChanges();
    expect(component.loadChassisByIndex).toHaveBeenCalled();
  });

  it('should call loadSNEByCDPRData', () => {
    spyOn(component, 'loadSNEByCDPRData').and.callThrough();
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'post').and.returnValue(of(['602232', '602234']));
    component.loadSNEByCDPRData({deviceModel: ['7750 SR-12'], deviceUsage: []});
    fixture.detectChanges();
    expect(component.loadSNEByCDPRData).toHaveBeenCalledWith({deviceModel: ['7750 SR-12'], deviceUsage: []});
  });

  it('should call loadSNEByDSRData', () => {
    spyOn(component, 'loadSNEByDSRData').and.callThrough();
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'post').and.returnValue(of(['602232', '602234']));
    component.loadSNEByDSRData('AA');
    fixture.detectChanges();
    expect(component.loadSNEByDSRData).toHaveBeenCalledWith('AA');
  });

  it('should call resetImgvalues', () => {
    spyOn(component, 'resetImgvalues').and.callThrough();
    component.resetImgvalues();
    fixture.detectChanges();
    expect(component.resetImgvalues).toHaveBeenCalled();
  });

  it('should call modeChange', () => {
    spyOn(component, 'modeChange').and.callThrough();
    component.modeChange(true);
    fixture.detectChanges();
    expect(component.modeChange).toHaveBeenCalledWith(true);
  });*/
});
