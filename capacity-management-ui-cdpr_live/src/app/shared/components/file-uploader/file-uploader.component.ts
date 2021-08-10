import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges } from '@angular/core';
import { UtilityService } from './../../services/utility.service';
import { CP_ERROR } from './../../constants/error.constant';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit, OnChanges {
  @ViewChild('fileImportInput', { static: false })
  fileImportInput: any;
  @Input() public acceptedFormats: Array<string>;
  @Input() public csvHeaders: Array<string>;
  @Output() fileUpload: EventEmitter<any> = new EventEmitter<any>();
  @Input() uploadSuccess;

  defaultvalue = 'Choose File';
  uploadName = '';
  constructor(private utility: UtilityService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.uploadSuccess) {
      this.fileImportInput.nativeElement.value = '';
      this.uploadName = '';
      this.defaultvalue = 'Choose File';
    }
  }

  uploadFile(file) {
    this.validateCSVFile(file, this.acceptedFormats);
  }

  validateCSVFile(file, acceptFormat) {
    if (file && !this.isCSVFile(file, acceptFormat)) {
      // tslint:disable-next-line:max-line-length
      this.utility.validateStatus(400, `Please verify the file type uploaded. It should be  ${this.acceptedFormats}`, CP_ERROR.SEVERITY.ERROR, 5000);
    } else if (file.target.files.length > 0) {
      this.processFileData(file.target.files[0]);
    }
  }

  isCSVFile(file, acceptFormat) {
    if (file.target.files.length > 0) {
      const fileName = file.target.files[0].name;
      const fileNameArr = fileName.split('.');
      const lastEle = fileNameArr.pop();
      if (acceptFormat.indexOf(lastEle) === -1) {
        this.fileReset();
        return false;
      } else {
        this.defaultvalue = fileName;
        this.uploadName = fileName;
        return true;
      }
    } else {
      return true;
    }
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = '';
    this.uploadName = '';
    this.defaultvalue = 'Choose File';
  }

  processFileData(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData: any = reader.result;
      const csvRecordsArray = csvData.split(/\r\n|\n/);
      const uploadedCsvheaders = this.getHeaderArray(csvRecordsArray);
      const headersNotFound = this.headersIdentical(this.csvHeaders, uploadedCsvheaders);
      if (headersNotFound.length > 0) {
        this.fileUpload.emit({ type: 'error', objFile: file });
      } else {
        this.fileUpload.emit({ type: 'success', objFile: file });
      }
    };
    reader.onerror = () => {
      this.utility.validateStatus(400, 'Unable to read CSV file', CP_ERROR.SEVERITY.ERROR, 5000);
    };
  }

  getHeaderArray(csvRecordsArr) {
    const headers = csvRecordsArr[0] && csvRecordsArr[0].split(',');
    const headerArray = [];
    for (const j in headers) {
      if (headers[j]) {
        headerArray.push(headers[j].trim());
      }
    }
    return headerArray;
  }

  headersIdentical(source, target) {
    return source.filter((item) => {
      return target.indexOf(item) === -1;
    });
  }
}
