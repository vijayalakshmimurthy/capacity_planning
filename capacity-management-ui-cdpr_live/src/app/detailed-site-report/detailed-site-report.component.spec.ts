import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DetailedSiteReportComponent } from './detailed-site-report.component';
import { DSRChartViewComponent } from './dsr-chart-view/dsr-chart-view.component';
import { DSRPiechartViewComponent } from './dsr-piechart-view/dsr-piechart-view.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from '../shared/services/app-service';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { routes } from './../app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('DetailedSiteReportComponent', () => {
    let component: DetailedSiteReportComponent;
    // tslint: disable - next - line: prefer -const
    let service: AppService;
    let fixture: ComponentFixture<DetailedSiteReportComponent>;
    let router: Router;
    let location: Location;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, SharedModule, BrowserAnimationsModule, RouterTestingModule.withRoutes(routes)],
            declarations: [DetailedSiteReportComponent, DSRChartViewComponent, DSRPiechartViewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: Router, useValue: router },
            ]
        }).compileComponents();
        service = TestBed.get(AppService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailedSiteReportComponent);
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    // it('should check function onkeyPressSearch which return success response', () => {
    //     spyOn(component, 'onkeyPressSearch').and.callThrough();
    //     const event = {
    //         target: {
    //             value: 'AA'
    //         }
    //     };
    //     const filterData = ['ABERDARE'];
    //     spyOn(service, 'get').and.returnValue(of(filterData));
    //     component.onkeyPressSearch(event);
    //     fixture.detectChanges();
    //     expect(component.onkeyPressSearch).toHaveBeenCalled();
    //     expect(component.filterData).toEqual(filterData);
    // });

    // it('should check function onkeyPressSearch which return error response', () => {
    //     spyOn(component, 'onkeyPressSearch').and.callThrough();
    //     const event = {
    //         target: {
    //             value: 'AA'
    //         }
    //     };
    //     const filterData = [];
    //     spyOn(service, 'get').and.returnValue(of(filterData));
    //     component.onkeyPressSearch(event);
    //     fixture.detectChanges();
    //     expect(component.onkeyPressSearch).toHaveBeenCalled();
    //     expect(component.filterData).toEqual(filterData);
    //     expect(component.searchSiteErrorMsg).toEqual('Site not found');
    // });

    // it('should check function getGraphDataBySiteName with siteName', () => {
    //     spyOn(component, 'getGraphDataBySiteName').and.callThrough();
    //     const event = 'ABERDARE';
    //     const userresponse = {
    //        data: {
    //            overAll: {
    //                labels: ['Apr,2020', 'May,2020', 'Jun,2020', 'Jul,2020', 'Aug,2020', 'Sep,2020', 'Oct,2020'],
    //                datasets: [
    //                    {label: 'Ethernet',
    //                    data: [0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17]},
    //                    {label: 'Broadband',
    //                    data: [0.08, 0.08, 0.08, 0.08, 0.18, 0.18, 0.18]},
    //                    {label: 'Backhaul',
    //                    data: [0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11]},
    //                    {label: 'Infrastructure',
    //                    data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]},
    //                    {label: 'P2PE',
    //                    data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]},
    //                    {label: 'Total Capacity',
    //                    data: [0.36, 0.36, 0.36, 0.36, 0.46, 0.46, 0.46]}
    //                 ]
    //             },
    //         }
    //     };
    //     spyOn(service, 'get').and.returnValue(of(userresponse));
    //     component.getGraphDataBySiteName(event);
    //     fixture.detectChanges();
    //     expect(component.getGraphDataBySiteName).toHaveBeenCalled();
    //     expect(component.graphData).toEqual(userresponse);
    //     expect(component.disable3DBtn).toBeTruthy();
    // });

    // it('should check function getGraphDataBySiteName with SNE', () => {
    //     spyOn(component, 'getGraphDataBySiteName').and.callThrough();
    //     const event = '602232';
    //     const userresponse = {
    //         data: {
    //             overAll: {
    //                 labels: ['Apr,2020', 'May,2020', 'Jun,2020', 'Jul,2020', 'Aug,2020', 'Sep,2020', 'Oct,2020'],
    //                 datasets: [
    //                     {label: 'Ethernet',
    //                     data: [0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17]},
    //                     {label: 'Broadband',
    //                     data: [0.08, 0.08, 0.08, 0.08, 0.18, 0.18, 0.18]},
    //                     {label: 'Backhaul',
    //                     data: [0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11]},
    //                     {label: 'Infrastructure',
    //                     data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]},
    //                     {label: 'P2PE',
    //                     data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]},
    //                     {label: 'Total Capacity',
    //                     data: [0.36, 0.36, 0.36, 0.36, 0.46, 0.46, 0.46]}
    //                  ]
    //              },
    //          }
    //      };
    //     spyOn(service, 'get').and.returnValue(of(userresponse));
    //     component.getGraphDataBySiteName(event);
    //     fixture.detectChanges();
    //     expect(component.getGraphDataBySiteName).toHaveBeenCalled();
    //     expect(component.graphData).toEqual(userresponse);
    //     expect(component.disable3DBtn).toBeFalsy();
    // });

    // it('should check function getGraphDataBySiteName with SNE error scenario', () => {
    //     spyOn(component, 'getGraphDataBySiteName').and.callThrough();
    //     const event = '602232';
    //     spyOn(service, 'get').and.returnValue(throwError([]));
    //     component.getGraphDataBySiteName(event);
    //     fixture.detectChanges();
    //     expect(component.getGraphDataBySiteName).toHaveBeenCalled();
    //     expect(component.showGraphs).toBeFalsy();
    //     expect(component.messageDisplay).toBe('Data is not available');
    // });

    // it('should check function getTableDataBySiteName with siteName', () => {
    //     spyOn(component, 'getTableDataBySiteName').and.callThrough();
    //     const event = 'ABERDARE';
    //     const userresponse = {
    //         donutChartResponse: {
    //             overAll: null,
    //             ethernet: null,
    //             broadband: null,
    //             backhaul: null,
    //             infrastructure: null,
    //             p2pe: null,
    //             ethernetPort: [
    //                 {port: '1G', labels: null, totalPort: 72, datasets: [{data: [71, 1, 0]}]},
    //                 {port: '10G', labels: null, totalPort: 10, datasets: [{data: [10, 0, 0]}]},
    //                 {port: '100G', labels: null, totalPort: 0, datasets: [{data: [0, 0, 0]}]}
    //             ],
    //             broadbandPort:[
    //                 {port: '1G', labels: null, totalPort: 30, datasets: [{data: [30, 0, 0]}]},
    //                 {port: '10G', labels: null, totalPort: 15, datasets: [{data: [10, 5, 0]}]},
    //                 {port: '100G', labels: null, totalPort: 0, datasets: [{data: [0, 0, 0]}]}
    //             ],
    //             table: {headers: null,
    //             data: [
    //                 {
    //                     groupName: 'FE',
    //                     dataName: 'L2 only',
    //                     dsrTotalPorts: '51',
    //                     freePorts: 1,
    //                     dsrUsedPorts: '21',
    //                     reservedPorts: '29',
    //                     inFlightPort: '0',
    //                     blockedPorts: '0',
    //                     unavailabilityPorts: '0',
    //                     freeUncabled: '0',
    //                     freeCabled: '1'
    //                 },
    //                 {
    //                     groupName: 'FE',
    //                     dataName: 'Satellite Shelf',
    //                     dsrTotalPorts: '0',
    //                     freePorts: 0,
    //                     dsrUsedPorts: '0',
    //                     reservedPorts: '0',
    //                     inFlightPort: '0',
    //                     blockedPorts: '0',
    //                     unavailabilityPorts: '0',
    //                     freeUncabled: '0',
    //                     freeCabled: '0'
    //                 }]
    //             }
    //         }
    //     };
    //     spyOn(service, 'get').and.returnValue(of(userresponse));
    //     component.getTableDataBySiteName(event);
    //     fixture.detectChanges();
    //     expect(component.getTableDataBySiteName).toHaveBeenCalled();
    //     expect(component.ethernetPieData).toEqual(userresponse['donutChartResponse'].ethernetPort);
    //     expect(component.broadBandPieData).toEqual(userresponse['donutChartResponse'].broadbandPort);
    //     expect(component.tableSettings.data).toEqual(userresponse['donutChartResponse'].table.data);
    //     expect(component.disable3DBtn).toBeTruthy();
    // });

    /*it('should call on3DClickNavigation', () => {
        spyOn(component, 'on3DClickNavigation').and.callThrough();
        component.on3DClickNavigation();
        fixture.detectChanges();
        expect(component.on3DClickNavigation).toHaveBeenCalled();
        expect(location.path()).toBe('/chassis-viewer');
    });

    it('should call downloadCSV', () => {
        spyOn(component, 'downloadCSV').and.callThrough();
        component.downloadCSV();
        fixture.detectChanges();
        expect(component.downloadCSV).toHaveBeenCalled();
    });

    it('should call navigateUrlOnTableSelection', () => {
        spyOn(component, 'navigateUrlOnTableSelection').and.callThrough();
        component.siteName = true;
        const event = {
            columnValue: 5,
            columnIndex: 5,
            rowValue: {
                groupName: 'dataName',
                dataName: 'FE'
            }
        };
        component.navigateUrlOnTableSelection(event);
        fixture.detectChanges();
        expect(component.navigateUrlOnTableSelection).toHaveBeenCalledWith(event);
    });*/
});
