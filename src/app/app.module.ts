import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonServicesService } from './common-services.service';
import { HttpModule } from '@angular/http';
import { ServerSettingsService } from './server-settings.service';
import { NotificationComponent } from './notification/notification.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NotificationServiceService } from './notification-service.service';
@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    CommonServicesService,
    ServerSettingsService,
    NotificationServiceService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
