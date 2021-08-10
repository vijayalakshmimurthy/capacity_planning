import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CbpReportService {
    optimizationHeader = new Subject<object>();
    optimizationHeader$ = this.optimizationHeader.asObservable();

    cardmovetab = new BehaviorSubject(null);
    cardmovetab$ = this.cardmovetab.asObservable().pipe(filter(data => data ? true : false));

    changeHeader(value) {
        this.optimizationHeader.next(value);
    }

  constructor() { }
}
