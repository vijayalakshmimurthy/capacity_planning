import { Directive, HostListener, Input, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
/** This is the directive to export thr file into xlsx */
@Directive({
  selector: '[appPNGDownload]'
})
export class PNGDownloadDirective {
  /** HTML element id */
  @Input() elementId: any;
  /** Download Image Name */
  @Input() downloadImageName: string;

  /** Get the DataURL */
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  /** Call downloadPNG() when onclick method is called */
  @HostListener('click') onClick() {
    this.downloadPNG();
  }

  /** Download graph in .png format */
  downloadPNG() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      html2canvas(document.querySelector('#' + this.elementId)).then((canvas) => {
        const hrefData = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
        const blobData = this.convertBase64ToBlobData(hrefData);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blobData, this.downloadImageName + '.png');
        } else { // chrome
          const blob = new Blob([blobData], { type: 'image/png' });
          const url = window.URL.createObjectURL(blob);
          // window.open(url);
          const link = document.createElement('a');
          link.href = url;
          link.download = this.downloadImageName;
          link.click();
        }
      });
    }, 500);
  }

  /** Covert data into blob value */
  convertBase64ToBlobData(base64Data: string, contentType: string = 'image/png', sliceSize = 512) {
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
