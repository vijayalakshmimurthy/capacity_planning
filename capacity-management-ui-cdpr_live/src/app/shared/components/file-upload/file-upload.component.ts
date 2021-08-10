import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { AppService } from '../../services/app-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/** This is the shared component for the File Upload to use uploading file to the database. */
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnChanges {
  uploadFileName = 'No file chosen';
  @Output() sendFileToParent = new EventEmitter<any>();
  fileToUpload: File;
  @Input() fileCancel = '';
  disableButton = false;
  @Input() upload = '';
  constructor(private appService: AppService, private modalService: NgbModal) {
  }
  /** to reset the file */
  ngOnChanges() {
    if (this.fileCancel === 'file cancel') {
      this.resetFile();
    }
  }
  /** to validate the selected file from choose box */
  incomingfile(files: FileList) {
    // this.fileCancel = '';
    this.disableButton = false;
    this.uploadFileName = files.item(0).name;
    this.fileToUpload = files.item(0);
  }

  /** To upload the File list */
  uploadDocuments() {
    if (this.fileToUpload) {
      this.disableButton = false;
      this.sendFileToParent.emit(this.fileToUpload);
    }
  }

  /** reset File properties */
  resetFile() {
    this.uploadFileName = 'No file chosen';
    const uploadEle = document.getElementById('file-upload') as HTMLElement;
    uploadEle['value'] = '';
    this.fileToUpload = null;
    this.disableButton = false;
  }
}
