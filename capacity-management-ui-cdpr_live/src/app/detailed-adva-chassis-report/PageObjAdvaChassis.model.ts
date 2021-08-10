export class PageObjAdvaChassis{
    'orderId';
    'orderItemId';
    'exchange1141Code';
    'trsArea1141Code';
    'shortfallType';
    'shortfallSubType';
    'windowsType';
    'isInflightIdentified';
    'sneIdentified';
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
    'shortfallReceivedDate';
  
    constructor(pageObj = {}) {
      this.orderId = pageObj['orderId'] ? pageObj['orderId'] : [];
      this.orderItemId = pageObj['orderItemId'] ? pageObj['orderItemId'] : [],
        this.exchange1141Code = pageObj['exchange1141Code'] ? pageObj['exchange1141Code'] : [],
        this.trsArea1141Code = pageObj['trsArea1141Code'] ? pageObj['trsArea1141Code'] : [];
      this.shortfallType = pageObj['shortfallType'] ? pageObj['shortfallType'] : [];
      this.shortfallSubType = pageObj['shortfallSubType'] ? pageObj['shortfallSubType'] : [];
      this.windowsType = pageObj['windowsType'] ? pageObj['windowsType'] : [];
      this.isInflightIdentified = pageObj['isInflightIdentified'] ? pageObj['isInflightIdentified'] : [];
      this.sneIdentified = pageObj['sneIdentified'] ? pageObj['sneIdentified'] : [];
      this.slotIdentified = pageObj['slotIdentified'] ? pageObj['slotIdentified'] : [];
      this.cpNumberIdentified = pageObj['cpNumberIdentified'] ? pageObj['cpNumberIdentified'] : [];
      this.wfmtProjectIdIdentified = pageObj['wfmtProjectIdIdentified'] ? pageObj['wfmtProjectIdIdentified'] : [];
      this.isNewCapacityPlanned = pageObj['isNewCapacityPlanned'] ? pageObj['isNewCapacityPlanned'] : [];
      this.capacityPlanningNumber = pageObj['capacityPlanningNumber'] ? pageObj['capacityPlanningNumber'] : [];
      this.wfmtProjectId = pageObj['wfmtProjectId'] ? pageObj['wfmtProjectId'] : [];
      this.SNEId = pageObj['SNEId'] ? pageObj['SNEId'] : [];
      this.currentStatus = pageObj['currentStatus'] ? pageObj['currentStatus'] : [];
      this.shortfallReceivedDate = pageObj['shortfallReceivedDate'] ? pageObj['shortfallReceivedDate'] : [];
      this.sortByField = pageObj['sortByField'] ? pageObj['sortByField'] : 'shortfallReceivedDate';
      this.sortByField = pageObj['sortByField'] ? pageObj['sortByField'] : 'shortfallReceivedDate';
      this.sortOrder = pageObj['sortOrder'] ? pageObj['sortOrder'] : 'asc';
      this.pageNo = pageObj['pageNo'] ? pageObj['pageNo'] : 1;
      this.pageSize = pageObj['pageSize'] ? pageObj['pageSize'] : 100;
  
    }
  }
  