import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  workflowtopage3d = new BehaviorSubject(null);
  workflowtopage3d$ = this.workflowtopage3d.asObservable();

  workflowtopage360 = new BehaviorSubject(null);
  workflowtopage360$ = this.workflowtopage360.asObservable();

  enableworlflow = new BehaviorSubject(null);
  enableworlflow$ = this.enableworlflow.asObservable();

  previousStatus = new BehaviorSubject(null);
  previousStatus$ = this.previousStatus.asObservable();

  status = new BehaviorSubject(null);
  status$ = this.status.asObservable();

  datato3dfrom360 = new BehaviorSubject(null);
  datato3dfrom360$ = this.datato3dfrom360.asObservable();

  datato360from3d = new BehaviorSubject(null);
  datato360from3d$ = this.datato360from3d.asObservable();

  enableNOWorlflow = new BehaviorSubject(null);
  enableNOWorlflow$ = this.enableNOWorlflow.asObservable();

  dataToOverviewFrom3d = new BehaviorSubject(null);
  dataToOverviewFrom3d$ = this.dataToOverviewFrom3d.asObservable();

  deviceRecoveryStatus = new BehaviorSubject(null);
  deviceRecoveryStatus$ = this.deviceRecoveryStatus.asObservable();

  enableDeviceRecoveryWorkflow = new BehaviorSubject(null);
  enableDeviceRecoveryWorkflow$ = this.enableDeviceRecoveryWorkflow.asObservable();

  constructor() { }
}
