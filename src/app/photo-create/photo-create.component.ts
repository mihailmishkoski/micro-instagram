import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPhoto } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-create',
  templateUrl: './photo-create.component.html',
  styleUrls: ['./photo-create.component.css']
})
export class PhotoCreateComponent {
  photoForm: FormGroup;
  
  constructor(private fb: FormBuilder, private photoService: PhotoService, private router: Router) {
    this.photoForm = this.fb.group({
      albumId: [null],
      id: [],
      title: [''],
      url: [''],
      thumbnailUrl: ['']
    });
  }

  onSubmit() {
    this.photoService.createPhoto(this.photoForm.value).subscribe({
      next: (response) =>{
        if(response.success && response.data)
        {
          console.log('Photo created successfully:', response.data);
          this.router.navigate(['/home']);
        }
        else
        {
          console.error('Photo creating failed:', response.message);
        }
      }
    })
  }
}
