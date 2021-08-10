import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This is used to define methods for hiding & showing loader.
 * @export
 * @class LoaderService
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /**
   * This is used to define behaviour subjet type varable.
   * @memberof LoaderService
   */
  public subject = new BehaviorSubject<boolean>(null);

  /**
   * This is used to hide show loader based on the flag value.
   * @param {boolean} flag
   * @memberof LoaderService
   */
  public showHideLoader(flag: boolean) {
    this.subject.next(flag);
  }
}
