import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChassisActionUsageComponent } from './chassis-action-usage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ChassisActionUsageComponent', () => {
  let component: ChassisActionUsageComponent;
  let fixture: ComponentFixture<ChassisActionUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SidebarModule, SharedModule, DropdownModule, ReactiveFormsModule],
      declarations: [ ChassisActionUsageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChassisActionUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
