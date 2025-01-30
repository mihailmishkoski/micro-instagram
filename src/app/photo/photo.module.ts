import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo.component';
import { PhotoDetailsComponent } from '../photo-details/photo-details.component';
import { PhotoEditComponent } from '../photo-edit/photo-edit.component';
import { FormsModule } from '@angular/forms';
import { PhotoCreateComponent } from '../photo-create/photo-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    PhotoComponent, 
    PhotoDetailsComponent,
    PhotoEditComponent,
    PhotoCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  exports: [
  ]
})
export class PhotoModule { }
