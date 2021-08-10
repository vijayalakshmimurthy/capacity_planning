import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    /** variable declaration before service initialize */
    private headers: object;
    private currentUser = '';
    public isRefresh = true;
    deviceType: any;
    public searchUploadData: any = { searchedKeyword: '', selectedSearchByObj: {}, searchData: [], page: 0, rowPerPage: 15 };
    userType;
    constructor(private http: HttpClient) {
        const roleName = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
        console.log("roleName " + roleName)
        if (roleName === 'PROD_CE_ADMIN') {
            this.userType = 'ADMIN';
        } else {
            this.userType = 'USER';
        }
        console.log("userType " + this.userType)
        /** Initializing headers in app service */
        this.headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                EIN: this.getEIN(),
                Name: this.getName(),
                email: this.getEmail(),
                Email_ID: this.getEmail(),
                role: this.userType,
                ein: this.getEIN(),
                version: 'v8'
                // uploadtype: this.getDeviceType()
            })
        };
        console.log("header " + this.headers )
    }

    /** Call HTTP get method */
    public get(url: any): Observable<any> {
        return this.http.get(url, this.headers).pipe();
    }

    /** Call HTTP delete method */
    public delete(url: string): Observable<any> {
        return this.http.delete(url, this.headers).pipe();
    }

    /** Call HTTP post method */
    public post(url: string, params: any): Observable<any> {
        return this.http.post<any>(url, JSON.stringify(params), this.headers)
            .pipe(timeout(600000));
    }
    // tslint:disable-next-line:jsdoc-format
    /** Call HTTP post method withour stringfy for loading satellite data*/
    public getsatellitedata(url: any, params: any): Observable<any> {
        return this.http.post<any>(url, params, this.headers)
            .pipe(timeout(30000));
    }

    public put(url: string): Observable<any> {
        return this.http.put<any>(url, this.headers)
            .pipe(timeout(30000));
    }
    getHeaders() {
        const EIN = this.getEIN();
        let headers = new HttpHeaders();
        headers = headers.set('EIN', EIN);
        return headers;
    }
    /** get Ein from window object */
    getEIN() {
        let EIN = '';
        if (EIN === '' || EIN === null || EIN !== 'undefined') {
            EIN = '611856638';
        }

        if (window.hasOwnProperty('CURRENT_USER')) {
            EIN = window['CURRENT_USER'].EIN;
        }
        console.log("EIN " + EIN)
        return EIN;
    }
     /** get DeviceType from window object */
    getDeviceType() {
        // let deviceType;
        const EIN = this.getEIN();
        const url = environment.base_url + 'forecast-management/get-profile-device-type?ein=' + EIN
        return this.http.get(url, this.headers).pipe();
        // return this.deviceType;
    }
    /** get Name from window object */
    getName() {
        let Name = '';
        if (Name === '' || Name === null || Name !== 'undefined') {
            Name = "Aradhana Songara";
        }
        if (window.hasOwnProperty('CURRENT_USER')) {
            Name = window['CURRENT_USER'].Name;
        }
        console.log("Name " + Name)
        return Name;
    }

    /** Get Email from window object */
    getEmail() {
        let Email = '';
        if (Email === '' || Email === null || Email !== 'undefined') {
            Email = 'test@abt.com';
        }
        if (window.hasOwnProperty('CURRENT_USER')) {
            Email = window['CURRENT_USER'].EmailId;
        }
        console.log("Email " + Email)
        return Email;
    }
    /** To send excel file to backend */
    postFile(url, fileToUpload: File): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders();
        const formData: FormData = new FormData();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('enctype', 'multipart/form-data');
        formData.append('file', fileToUpload);
        formData.append('fileName', fileToUpload.name);
        formData.append('fileType', fileToUpload.type);
       // headers = headers.append('upload-type', 'Edge-rt');
        // tslint:disable-next-line:object-literal-shorthand
        return this.http.post(url, formData, { headers: headers });

    }

    /** call service to download csv file */
    downloadCSV(url: string) {
        window.open(url, '_self');
    }
    requestWithParams(params): Observable<any> {
        return this.http.post(`${params.url}`, params.request, { headers: this.getHeaders() })
            .pipe();
    }
}
