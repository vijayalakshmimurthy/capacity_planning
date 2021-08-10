export class PageObjDetailed {
  'globalSearchData';
  'siteName';
  'code1141';
  'sneId';
  'portId';
  'portSpeed';
  'cardModel';
  'reservationDate';
  'reservedByName';
  'reservedBy';
  'cuf';
  'cufValue';
  'expiryDate';
  'sortByField';
  'sortOrder';
  'pageNo';
  'reservationProjectType';
  'pageSize';
  'muxId';
  'lagId';

  constructor(pageObj = {}) {
    this.globalSearchData = pageObj['globalSearchData'] ? pageObj['globalSearchData'] : [];
    this.siteName = pageObj['siteName'] ? pageObj['siteName'] : [],
    this.code1141 = pageObj['code1141'] ? pageObj['code1141'] : [],
    this.sneId = pageObj['sneId'] ? pageObj['sneId'] : [];
    this.portId = pageObj['portId'] ? pageObj['portId'] : [];
    this.portSpeed = pageObj['portSpeed'] ? pageObj['portSpeed'] : [];
    this.cardModel = pageObj['cardModel'] ? pageObj['cardModel'] : [];
    this.reservationDate = pageObj['reservationDate'] ? pageObj['reservationDate'] : [];
    this.reservedByName = pageObj['reservedByName'] ? pageObj['reservedByName'] : []; 
    this.cuf = pageObj['cuf'] ? pageObj['cuf'] : [];
    this.cufValue = pageObj['cufValue'] ? pageObj['cufValue'] : [];
    this.reservedBy = pageObj['reservedBy'] ? pageObj['reservedBy'] : [];
    this.expiryDate = pageObj['expiryDate'] ? pageObj['expiryDate'] : [];
    this.reservationProjectType = pageObj['reservationProjectType'] ? pageObj['reservationProjectType'] : [];
    this.muxId = pageObj['muxId'] ? pageObj['muxId'] : [];
    this.lagId = pageObj['lagId'] ? pageObj['lagId'] : [];
    this.sortByField = pageObj['sortByField'] ? pageObj['sortByField'] : 'siteName';
    this.sortOrder = pageObj['sortOrder'] ? pageObj['sortOrder'] : 'asc';
    this.pageNo = pageObj['pageNo'] ? pageObj['pageNo'] : 1;
    this.pageSize = pageObj['pageSize'] ? pageObj['pageSize'] : 100;

  }
}
