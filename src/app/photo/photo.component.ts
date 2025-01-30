import { Component, ViewChild } from '@angular/core';
import { PhotoService } from './photo.service';
import { IPhoto } from './photo.model';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

const batchSize = 10;

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  photos: IPhoto[] = [];
  statusMessage!: string;

  offset = new BehaviorSubject<number>(0);
  limit: number = batchSize;
  theEnd = false;
  savedScrollPosition: number = 0;

  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  constructor(
    private photoService: PhotoService,
    private route: Router,
    
  ){}

  ngOnInit(){
    this.loadPhotos();
  }

  loadPhotos() {
    this.offset.pipe(
      switchMap(() => this.photoService.getPhotos(this.offset.value, this.limit))
    ).subscribe({
      next: (photos) => {
        if (photos.length < this.limit) {
          this.theEnd = true; 
        }
        this.photos = [...this.photos, ...photos];
        const savedScrollPos = sessionStorage.getItem('savedScrollPosition');
      if (savedScrollPos && this.viewport) {
        setTimeout(() => {
          this.savedScrollPosition = parseInt(savedScrollPos, 10);
          this.viewport.scrollToOffset(this.savedScrollPosition);
        });
      }
      },
      error: (error) => {
        console.error('Error fetching photos:', error);
      }
    });
  }
  
  nextBatch(e: any, lastPhoto: IPhoto) {
    if(this.theEnd){
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if(end ===total){
      this.offset.next(this.photos.length);
    }
  }
  
  getPhotoDetails(photoId: number)
  {
    this.savedScrollPosition = this.viewport.getOffsetToRenderedContentStart() || 0;
    sessionStorage.setItem('savedScrollPosition', String(this.savedScrollPosition));
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
    this.savedScrollPosition = this.viewport.getOffsetToRenderedContentStart() || 0;
    sessionStorage.setItem('savedScrollPosition', String(this.savedScrollPosition));
    const selectedPhoto = this.photos.find(photo => photo.id === photoId);
    if(selectedPhoto){
      this.photoService.setSelectedPhoto(selectedPhoto);
    }
    this.route.navigate(['/photo-edit', photoId]); 
  }

  createPhoto()
  {
    this.savedScrollPosition = this.viewport.getOffsetToRenderedContentStart() || 0;
    sessionStorage.setItem('savedScrollPosition', String(this.savedScrollPosition));
    this.route.navigate(['photo-create']);
  }
}