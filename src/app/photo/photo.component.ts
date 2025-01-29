import { Component } from '@angular/core';
import { PhotoService } from './photo.service';
import { IPhoto } from './photo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  photos: IPhoto[] = [];
  statusMessage!: string;
  constructor(
    private photoService: PhotoService,
    private route: Router,
  ){}

  ngOnInit(){
    this.photoService.getPhotos().subscribe((photos) =>{
      this.photos = photos.slice(0, 10);
    })
  }

  getPhotoDetails(photoId: number)
  {
    this.route.navigate(['/photo-details', photoId]);
  }

  deletePhoto(photoId: number) {
    this.photoService.deletePhoto(photoId).subscribe((response) => {
      if (response.success) {
        this.statusMessage = String(response.message);
        console.log(this.statusMessage);
        this.photos = this.photos.filter((photo) => photo.id !== photoId);
      } else {
        this.statusMessage = response.message || 'An error occurred.';
        console.error(this.statusMessage);
      }
    });
  }

  editPhoto(photoId: number)
  {
    const selectedPhoto = this.photos.find(photo => photo.id === photoId);
    if(selectedPhoto){
      this.photoService.setSelectedPhoto(selectedPhoto);
    }
    this.route.navigate(['/photo-edit', photoId]); 
  }

  createPhoto()
  {
    this.route.navigate(['photo-create']);
  }
}
