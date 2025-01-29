import { Component } from '@angular/core';
import { IPhoto } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent {

  photo: IPhoto | undefined;
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ){}

  ngOnInit(){
    const photoId = Number(this.route.snapshot.paramMap.get('id'));

    if(photoId)
    {
      this.photoService.getPhotos().subscribe((photos) => {
      this.photo = photos.find(p => p.id === photoId);
      });
    }
  }
}
