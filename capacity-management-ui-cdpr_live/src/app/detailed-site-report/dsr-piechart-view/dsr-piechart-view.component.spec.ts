import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DSRPiechartViewComponent } from './dsr-piechart-view.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('DsrPiechartViewComponent', () => {
    let component: DSRPiechartViewComponent;
    let fixture: ComponentFixture<DSRPiechartViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, SharedModule],
            declarations: [DSRPiechartViewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DSRPiechartViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // describe('LoadPieChart', () => {
    //     it('should call ngOnChange method', () => {
    //         spyOn(component, 'loadPieChartByPortSpeed');
    //         component.ngOnChanges();
    //         expect(component.loadPieChartByPortSpeed).toHaveBeenCalled();
    //     });
    //     it('loadPieChartByPortSpeed', () => {
    //         component.pieChartData = [{ port: '1G', labels: null, totalPort: 68, datasets: [{ data: [50, 7, 11] }] },
    //         { port: '10G', labels: null, totalPort: 13, datasets: [{ data: [10, 2, 1] }] },
    //         { port: '100G', labels: null, totalPort: 0, datasets: [{ data: [0, 0, 0] }] }];
    //         component.loadPieChartByPortSpeed('1G');
    //         fixture.detectChanges();
    //         expect(component.data.labels).toEqual(['Used Port', 'Reserved Port', 'Free Port']);
    //         expect(component.data.datasets[0].backgroundColor).toEqual(['#00A2D7', '#6D00A7', '#008A24']);
    //         expect(component.data.datasets[0].backgroundColor).toEqual(['#00A2D7', '#6D00A7', '#008A24']);
    //     });
    // });
});
