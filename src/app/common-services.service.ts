import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServerSettingsService } from './server-settings.service';

@Injectable()
export class CommonServicesService {
  private apiUrl = this.svrSettings.getApiURL();
  constructor(private http: Http,
              private svrSettings: ServerSettingsService) { }
  uploadImage(params) {
    const headers = new Headers();
    const url = this.apiUrl + 'images/upload';
    console.log(params);
    const result = this.http.post(url, params, {headers: headers})
    .map(res => res.json());
    return result;
  }
  getImages() {
    const url = this.apiUrl + 'images';
    const result = this.http.get(url)
    .map(res => res.json());
    return result;
  }
  deleteImage(params) {
    const headers = new Headers();
    const url = this.apiUrl + 'images/deleteImage';
    const result = this.http.post(url, params, {headers: headers})
    .map(res => res.json());
    return result;
  }
}
