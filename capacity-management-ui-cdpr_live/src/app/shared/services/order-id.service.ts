import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderIdService {
  constructor() {}
  public cardMove = new BehaviorSubject<any>(null);
  cardMovePage = this.cardMove.asObservable();

  public emailIdPage = new BehaviorSubject<string>(null);
  emailIdSubscribe = this.emailIdPage.asObservable();

  public cardMoveSummary = new BehaviorSubject<any>(null);
  cardMoveSummaryPage = this.cardMoveSummary.asObservable();

  public cardInfillTableData = new BehaviorSubject<any>(null);
  cardInfillTableDataSend  = this.cardInfillTableData.asObservable();

  public portMoveObj = new BehaviorSubject<any>(null);
  portMoveRequestObj  = this.portMoveObj.asObservable();

  public recoverSNEList = new BehaviorSubject<any>(null);
  recoverSNEListObj  = this.recoverSNEList.asObservable();

  public portMoveIdList = new BehaviorSubject<any>(null);
  portMoveIdListObj  = this.portMoveIdList.asObservable();

  OrderIdFun(cardMoveParam) {
    this.cardMove.next(cardMoveParam);
  }
  emailIdPass(emailId) {
    this.emailIdPage.next(emailId);
  }
  cardSummary(cardMoveSummaryParam) {
    this.cardMoveSummary.next(cardMoveSummaryParam);
  }
  setCardInfillTableData(tableResponse) {
    this.cardInfillTableData.next(tableResponse);
  }
  setPortMoveRequestObj(requestObj) {
    this.portMoveObj.next(requestObj);
  }
  setRecoverSneList(recoverSNEList) {
    this.recoverSNEList.next(recoverSNEList);
  }
  setPortMoveIdList(portMoveIdList) {
    this.portMoveIdList.next(portMoveIdList);
  }
}
