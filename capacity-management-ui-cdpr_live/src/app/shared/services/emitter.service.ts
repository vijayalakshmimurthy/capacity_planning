import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  constructor() { }
  private message = new BehaviorSubject<any>(0);
  errorDataChangeEmitted$ = this.message.asObservable();

  sendMessage(message: any) {
    this.message.next(message);
  }
}
