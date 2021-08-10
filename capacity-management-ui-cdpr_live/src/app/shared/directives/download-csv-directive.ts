import { Directive, HostListener, Input } from '@angular/core';
  /** This is the directive to export thr file into xlsx */
@Directive({
    selector: '[appCSVDownload]'
})
export class CSVDownloadDirective {
    @Input() data: any;
    @Input() fileName: string;
    dataType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';

    @HostListener('click') onClick() {
        this.downloadCSV();
    }

    /** Downloads CSV to the browser */
    downloadCSV() {
        const sheetBase64 = this.data;
        const blobData = this.convertBase64ToBlobData(sheetBase64);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blobData, this.fileName);
        } else { // chrome
            const blob = new Blob([blobData], { type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
            const url = window.URL.createObjectURL(blob);
            // window.open(url);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.fileName;
            link.click();
        }
    }
    /** Convert to base64 to BlobData */
    convertBase64ToBlobData(base64Data: string, contentType: string = this.dataType, sliceSize = 512) {
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}
