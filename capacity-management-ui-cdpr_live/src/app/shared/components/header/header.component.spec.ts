// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

// import { HeaderComponent } from './header.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule } from '@angular/forms';
// import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
// import { Router, ActivatedRoute } from '@angular/router';
// import { RoleService } from '../../services/roles.service';
// import { AppService } from '../../services/app-service';
// import { SvgComponent } from '../svg/svg.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { LogoutComponent } from '../logout/logout.component';

// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//   let serviceRoll: RoleService;
//   // tslint:disable-next-line:prefer-const
//   let httpTestingController: HttpTestingController;
//   // tslint:disable-next-line:prefer-const
//   let route: ActivatedRoute;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [HeaderComponent, SvgComponent],
//       providers: [RoleService, NgbActiveModal],
//       imports: [HttpClientTestingModule, NgbModule, FormsModule, RouterTestingModule],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create',
//   inject(
//     [HttpTestingController],
//     () => {
//       expect(component).toBeTruthy();
//     }
//   )
// );
//   // it('should create Header PRE_PROD_CE_ADMIN', () => {
//   //   serviceRoll = fixture.debugElement.injector.get(RoleService);
//   //   component.roles = ['admin'];
//   //   component.changedRole = 'PRE_PROD_CE_ADMIN';
//   //   component.menuList = [{
//   //     menuName: 'Service Transparency Tool',
//   //     url: '/srimsServiceTransparency'
//   //   }, {
//   //     menuName: 'Data Center Upload',
//   //     url: '/data-center'
//   //   } ];
//   //   component.headerUser = 'Capacity Planning Admin';
//   //   expect(component).toBeTruthy();
//   // });
//   // it('should create Header PROD_CE_VIEWER', () => {
//   //   serviceRoll = fixture.debugElement.injector.get(RoleService);
//   //   component.roles = ['user'];
//   //   component.changedRole = 'PROD_CE_VIEWER';
//   //   component.menuList = [{
//   //     menuName: 'Service Transparency Tool',
//   //     url: '/srimsServiceTransparency'
//   //   }];
//   //   component.headerUser = 'Capacity Planning User';
//   //   expect(component).toBeTruthy();
//   // });
//   // it('should check function openSwitchProfile', () => {
//   //   spyOn(component, 'openSwitchProfile').and.callThrough();
//   //   component.displaySwtichProfile = true;
//   //   component.openSwitchProfile();
//   //   expect(component.openSwitchProfile).toBeDefined();
//   // });
//   // it('should check function getRolesPopup', () => {
//   //   spyOn(component, 'getRolesPopup').and.callThrough();
//   //   component.userRoleList = [
//   //     { displayName: 'Capacity Planning User', roleName: 'PROD_CE_VIEWER' }
//   //   ];
//   //   component.getRolesPopup();
//   //   expect(component.getRolesPopup).toBeDefined();
//   // });
//   // it('should check function closeSwtichProfilePopup', () => {
//   //   spyOn(component, 'closeSwtichProfilePopup').and.callThrough();
//   //   component.displaySwtichProfile = false;
//   //   component.userRoleList = [];
//   //   component.closeSwtichProfilePopup();
//   //   expect(component.closeSwtichProfilePopup).toBeDefined();
//   // });
//   // it('should check function switchProfile', () => {
//   //   spyOn(component, 'switchProfile').and.callThrough();
//   //   component.changedRole = 'PROD_CE_VIEWER';
//   //   component.headerUser = 'Capacity Planning User';
//   //   component.menuList = [{
//   //     menuName: 'Service Transparency Tool',
//   //     url: '/srimsServiceTransparency'
//   //   }];
//   //   component.closeSwtichProfilePopup();
//   //   component.switchProfile();
//   //   expect(component.switchProfile).toBeDefined();
//   // });
//   it('should check logoutfinal', () => {
//     spyOn(component, 'logoutfinal').and.callThrough();
//     component.loggedIN = false;
//     component.logoutfinal();
//     expect(component.logoutfinal).toBeDefined();
//   });
//   it('should check navigateToUrl srimsServiceTransparency', () => {
//     const url = '/srimsServiceTransparency';
//     component.navigateToUrl(url);
//     expect(component.navigateToUrl).toBeDefined();
//   });
// });
