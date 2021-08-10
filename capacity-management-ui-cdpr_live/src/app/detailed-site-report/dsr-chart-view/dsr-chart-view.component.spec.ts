import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DSRChartViewComponent } from './dsr-chart-view.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('DsrChartViewComponent', () => {
    let component: DSRChartViewComponent;
    let fixture: ComponentFixture<DSRChartViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, SharedModule],
            declarations: [DSRChartViewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DSRChartViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('LoadGraphData', () => {
        it('should call ngOnChange method', () => {
            spyOn(component, 'loadGraphData');
            component.ngOnChanges();
            expect(component.loadGraphData).toHaveBeenCalled();
        });

        it('should call changeProduct method', () => {
            spyOn(component, 'changeProduct');
            component.changeProduct({ name: 'Overall', active: true, type: 'line' });
            fixture.detectChanges();
            expect(component.changeProduct).toHaveBeenCalled();
        });

        it('should call changeProduct method when user clicked on tab', () => {
           // component.productType = ProductTypeConstants;
            component.changeProduct({ name: 'Overall', active: true, type: 'line' });
            fixture.detectChanges();
            expect(component.activeTabName).toEqual('Overall');
            expect(component.type).toEqual('line');
        });

        // it('should call loadGraphData method', () => {
        //     component.graphData = {
        //         overAll: {
        //             labels: ['08-02-2020', '15-02-2020', '22-02-2020'],
        //             datasets: [
        //                 { label: 'Ethernet', data: [0.28, 0.28, 0.28] },
        //                 { label: 'Broadband', data: [0.08, 0.08, 0.08] },
        //                 { label: 'Backhaul', data: [0.0, 0.0, 0.0] },
        //             ]
        //         },
        //         ethernet: {
        //             labels: ['08-02-2020'],
        //             datasets: [{ label: '1G-FREE', data: [18.0] },
        //             { label: '1G-RESERVED', data: [2.0] },
        //             { label: '1G-USED', data: [49.0] },
        //             { label: '10G-FREE', data: [6.0] },
        //             { label: '10G-RESERVED', data: [0.0] },
        //             { label: '10G-USED', data: [15.0] },
        //             { label: '100G-FREE', data: [6.0] },
        //             { label: '100G-RESERVED', data: [0.0] },
        //             { label: '100G-USED', data: [15.0] }]
        //         }
        //     };
        //     component.type = 'line';
        //     component.activeTabName = 'Overall';
        //     component.loadGraphData();
        //     fixture.detectChanges();
        //     expect(component.type).toEqual('line');
        //     expect(component.downloadImageName).toEqual('Line-chart');
        //     component.type = 'bar';
        //     component.activeTabName = 'Ethernet';
        //     component.loadGraphData();
        //     fixture.detectChanges();
        //     expect(component.type).toEqual('bar');
        //     expect(component.downloadImageName).toEqual('Bar-chart');
        // });

        it('should emit downloadCSV method onclick of Download XLS button', () => {
            spyOn(component.downloadCSV, 'emit');
            component.downloadCSVLine();
            expect(component.downloadCSV.emit).toHaveBeenCalled();
        });
    });
});
