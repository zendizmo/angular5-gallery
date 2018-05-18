import { Component, OnInit } from '@angular/core';
import {FormGroup,
        FormsModule,
        ReactiveFormsModule,
        FormBuilder} from '@angular/forms';
import * as $ from 'jquery';
import { CommonServicesService } from '../common-services.service';
import { NotificationServiceService } from '../notification-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  title = 'app';
  myForm: FormGroup;
  imageNm: string;
  images = [];
  modalImage: any;

  constructor(private fb: FormBuilder,
              private svcs: CommonServicesService,
              private noteSvc: NotificationServiceService
  ) {  }

  ngOnInit() {
    this.createForm();
    this.loadImages();
  }
  createForm() {
    this.myForm = this.fb.group({
      imageName: '',
      imageAvatar: null
    });
  }

  onUploadBtnClick() {
    $('#imageFile').click();
  }
  onFileChange(event) {
    const reader = new FileReader();
    $('#upload-btn').attr('style', 'visibility: visible');
    if (event.target.files &&
      event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        $('#preview')
        .attr('src', URL.createObjectURL(event.target.files[0]));
        this.myForm.get('imageAvatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }
  onSubmit() {
    const formModel = this.myForm.value;
    const params = {
      imageName: this.myForm.get('imageNm'),
      imageAvatar: this.myForm.get('imageAvatar'),
      maintDt: Date.now()
    };
    this.svcs.uploadImage(formModel).subscribe(data => {
      if (data.success) {
        this.noteSvc.setNotification('Success', data.msg);
        $('.notification-btn').click();
        this.loadImages();
      } else {
        this.noteSvc.setNotification('Failure', data.msg);
        $('.notification-btn').click();
      }
    });
  }
  loadImages() {
    this.svcs.getImages().subscribe(images => {
      this.images = images;
    },
    err => {
      console.log(err);
      return err;
    }
    );
  }
  maximizeImage(image) {
    this.modalImage = image;
    this.noteSvc.setNotification(
      image.imageName,
      image.imagePath
      );
      $('.max-img-notification-btn').click();
  }
  onDeleteClick(image) {
    this.modalImage = image;
    this.noteSvc.setNotification(
    'Confirmation',
    'Are you sure you want to remove ' + image.imageName
    + ' from the system?'
    );
    $('.del-notification-btn').click();
  }
  deleteImage() {
    console.log('From notifications ' + this.modalImage._id);
    const params = {
      imageId: this.modalImage.imageId
    };
    this.svcs.deleteImage(params).subscribe(data => {

      if (data.success) {
        this.loadImages();
        $('.cancel-del-modal').click();
        this.noteSvc.setNotification('Success', data.msg);
        $('.notification-btn').click();
        this.loadImages();
      } else {
        $('.cancel-del-modal').click();
        this.noteSvc.setNotification('Failure', data.msg);
        $('.notification-btn').click();
      }
    });
  }

}
