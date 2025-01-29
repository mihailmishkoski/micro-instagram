import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent {
  
  photo: IPhoto | undefined;


  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.photoService.getSelectedPhoto().subscribe((photo) => {
      if (photo) { //if user clicks on edit button
        this.photo = { ...photo }; 
      } else { //if user refresh the page 
        debugger;
        const photoId = this.activateRoute.snapshot.paramMap.get('id');
        if (photoId) {
          this.photoService.getPhotoById(Number(photoId)).subscribe((response) => {
            if (response.success && response.data) {
              this.photo = response.data;
            }
          });
        }
      }
    });
  }  
  onSubmit() {
    if (this.photo) {
      this.photoService.editPhoto(this.photo).subscribe((response) => {
        if (response.success && response.data) {
          console.log(response.message);
          this.photoService.setSelectedPhoto(response.data);
          this.route.navigate(['/home']);
        } else {
          console.error(response.message);
        }
      });
    } 
    else{
      console.error('An error occured.')
    }
  }
}
