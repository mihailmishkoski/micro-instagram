import { Injectable } from '@angular/core';
import { IPhoto } from './photo.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs'; // 'of' is used to return an observable
import { HttpClient } from '@angular/common/http';
import { Response } from '../ApiResponse.model'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private selectedPhoto = new BehaviorSubject<IPhoto | null>(null);

  constructor(private http: HttpClient) {}
  
  createPhoto(photo: IPhoto): Observable<Response<IPhoto>> {
    return this.http.post<IPhoto>('https://jsonplaceholder.typicode.com/photos', photo).pipe(
      map((newPhoto) => ({
        success: true,
        data: newPhoto,
        message: `Photo created successfully with ID ${newPhoto.id}.`,
      })),
      catchError((error) => {
        const errorMessage = `Error: ${error.status} - ${error.statusText}`;
        return of({
          success: false,
          message: errorMessage,
        });
      })
    );
  }
   

  getPhotos(): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>('https://jsonplaceholder.typicode.com/photos');
  }
  getPhotoById(photoId: number): Observable<Response<IPhoto>> {
    return this.http.get<IPhoto>(`https://jsonplaceholder.typicode.com/photos/${photoId}`).pipe(
      map((photo) => ({
        success: true,
        data: photo,
        message: `Photo with ID ${photoId} fetched successfully.`,
      })),
      catchError((error) => {
        const errorMessage = error.status === 404 
          ? `Photo with ID ${photoId} not found.` 
          : `Error: ${error.status} - ${error.statusText}`;
        return of({
          success: false,
          message: errorMessage,
        });
      })
    );
  }
  
  editPhoto(photo: IPhoto): Observable<Response<IPhoto>> {
    debugger;
    return this.http.put<IPhoto>(`https://jsonplaceholder.typicode.com/photos/${photo.id}`, photo).pipe(
      map((updatedPhoto) => ({
        success: true,
        data: updatedPhoto,
        message: `Photo with ID ${photo.id} updated successfully.`,
      })),
      catchError((error) => {
        const errorMessage = `Error: ${error.status} - ${error.statusText}`;
        return of({
          success: false,
          message: errorMessage,
        });
      })
    );
  }  

  deletePhoto(photoId: number): Observable<Response<string>> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/photos/${photoId}`).pipe(
      map(() => ({
        success: true,
        message: `Photo with ID ${photoId} deleted successfully.`,
      })),
      catchError((error) => {
        const errorMessage = `Error: ${error.status} - ${error.statusText}`;
        return of({
          success: false,
          message: errorMessage,
        });
      })
    );
  }

  
  setSelectedPhoto(photo: IPhoto) {
    this.selectedPhoto.next(photo);
  }

  getSelectedPhoto() {
    return this.selectedPhoto.asObservable();
  }
  
}
