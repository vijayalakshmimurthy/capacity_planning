import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    navigateDSRTo3DBySiteName = new BehaviorSubject<object>(null);
    navigateDSRTo3DBySiteName$ = this.navigateDSRTo3DBySiteName.asObservable();

    navigateDSRTo3DBySNE = new BehaviorSubject(null);
    navigateDSRTo3DBySNE$ = this.navigateDSRTo3DBySNE.asObservable();

    navigateCDPRToDSRBySiteName = new BehaviorSubject(null);
    navigateCDPRToDSRBySiteName$ = this.navigateCDPRToDSRBySiteName.asObservable();

    navigateCDPRTo3D = new BehaviorSubject(null);
    navigateCDPRTo3D$ = this.navigateCDPRTo3D.asObservable();

    navigateCDPRTo360 = new BehaviorSubject(null);
    navigateCDPRTo360$ = this.navigateCDPRTo360.asObservable();

    navigate3DToCBPBySiteName = new BehaviorSubject(null);
    navigate3DToCBPBySiteName$ = this.navigate3DToCBPBySiteName.asObservable();

    navigateCBPTo3DByRowData = new BehaviorSubject(null);
    navigateCBPTo3DByRowData$ = this.navigateCBPTo3DByRowData.asObservable();

    navigateCRSCToDPPRBySiteName = new BehaviorSubject(null);
    navigateCRSCToDPPRBySiteName$ = this.navigateCRSCToDPPRBySiteName.asObservable();

    navigateCRSCToDACRBySiteName = new BehaviorSubject(null);
    navigateCRSCToDACRBySiteName$ = this.navigateCRSCToDACRBySiteName.asObservable();

    navigateFMRToFABySiteName = new BehaviorSubject(null);
    navigateFMRToFABySiteName$ = this.navigateFMRToFABySiteName.asObservable();

    constructor() { }
}
