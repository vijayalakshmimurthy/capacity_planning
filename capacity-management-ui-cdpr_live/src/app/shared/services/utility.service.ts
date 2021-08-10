import { CP_ERROR } from './../constants/error.constant';
import { Injectable } from '@angular/core';
import { EmitterService } from './emitter.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private emitterService: EmitterService) { }

  /**
   * @author Binu Paul
   * @param {Number} errorCode
   * @param {string} msg
   * @param {string} severity
   * @param {number} life
   */

  validateStatus(errorCode, msg, severity, life?) {
    let errorMsg = CP_ERROR.STATUS_CODE[errorCode];
    if (errorMsg === undefined) {
      errorMsg = {};
      errorMsg.code = 'Error Message';
      errorMsg.message = msg;
      errorMsg.severity = severity;
      errorMsg.life = life ? life : 3000;
    } else {
      errorMsg.code = errorMsg.code;
      errorMsg.message = msg;
      errorMsg.severity = severity;
      errorMsg.life = life ? life : 3000;
    }

    this.emitterService.sendMessage(errorMsg);
  }
}
