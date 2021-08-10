export class PageObjDetailed {
  'orderId';
  'orderItemId';
  'exchange1141Code';
  'trsArea1141Code';
  'shortfallType';
  'shortfallSubType';
  'isInflightIdentified';
  'slotIdentified';
  'cpNumberIdentified';
  'wfmtProjectIdIdentified';
  'isNewCapacityPlanned';
  'capacityPlanningNumber';
  'wfmtProjectId';
  'SNEId';
  'currentStatus';
  'capacityAvailableDate';
  'sortByField';
  'sortOrder';
  'pageNo';
  'pageSize';

  constructor(pageObj = {}) {
    this.orderId = pageObj['orderId'] ? pageObj['orderId'] : [];
    this.orderItemId = pageObj['orderItemId'] ? pageObj['orderItemId'] : [],
    this.exchange1141Code = pageObj['exchange1141Code'] ? pageObj['exchange1141Code'] : [],
    this.trsArea1141Code = pageObj['trsArea1141Code'] ? pageObj['trsArea1141Code'] : [];
    this.shortfallType = pageObj['shortfallType'] ? pageObj['shortfallType'] : [];
    this.shortfallSubType = pageObj['shortfallSubType'] ? pageObj['shortfallSubType'] : [];
    this.isInflightIdentified = pageObj['isInflightIdentified'] ? pageObj['isInflightIdentified'] : [];
    this.slotIdentified = pageObj['slotIdentified'] ? pageObj['slotIdentified'] : [];
    this.cpNumberIdentified = pageObj['cpNumberIdentified'] ? pageObj['cpNumberIdentified'] : [];
    this.wfmtProjectIdIdentified = pageObj['wfmtProjectIdIdentified'] ? pageObj['wfmtProjectIdIdentified'] : [];
    this.isNewCapacityPlanned = pageObj['isNewCapacityPlanned'] ? pageObj['isNewCapacityPlanned'] : [];
    this.capacityPlanningNumber = pageObj['capacityPlanningNumber'] ? pageObj['capacityPlanningNumber'] : [];
    this.wfmtProjectId = pageObj['wfmtProjectId'] ? pageObj['wfmtProjectId'] : [];
    this.SNEId = pageObj['SNEId'] ? pageObj['SNEId'] : [];
    this.currentStatus = pageObj['currentStatus'] ? pageObj['currentStatus'] : [];
    this.capacityAvailableDate = pageObj['capacityAvailableDate'] ? pageObj['capacityAvailableDate'] : [];
    this.sortByField = pageObj['sortByField'] ? pageObj['sortByField'] : 'siteName';
    this.sortOrder = pageObj['sortOrder'] ? pageObj['sortOrder'] : 'asc';
    this.pageNo = pageObj['pageNo'] ? pageObj['pageNo'] : 1;
    this.pageSize = pageObj['pageSize'] ? pageObj['pageSize'] : 100;

  }
}
