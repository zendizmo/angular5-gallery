import { Component,
   OnInit, Output,
   EventEmitter } from '@angular/core';
import { NotificationServiceService } from '../notification-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  modalItem: string;
  notification = {
    title: '',
    message: ''
  };
  @Output() delEvent = new EventEmitter();
  subscription: Subscription;
  constructor(private noteSvc: NotificationServiceService) { }

  ngOnInit() {
    this.subscription = this.noteSvc.getNotification()
    .subscribe(notification => {
      this.notification = notification;
    });
  }
  deleteItem() {
    this.delEvent.emit();
  }

}
