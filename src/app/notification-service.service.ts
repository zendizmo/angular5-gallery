import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationServiceService {

  notification = {
    title: '',
    message: ''
  };

  private subject = new Subject<any>();

  constructor() { }

  setNotification(title, message) {
    this.subject.next(
      this.notification = {
        title: title,
        message: message
      }
    );
  }

  getNotification(): Observable<any> {
    return this.subject.asObservable();
  }

}
