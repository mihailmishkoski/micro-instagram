import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoComponent } from './photo/photo.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { PhotoCreateComponent } from './photo-create/photo-create.component';

const routes: Routes = [
  { path: 'home', component: PhotoComponent, title: "Instagram" },
  { path: 'photo-details/:id', component: PhotoDetailsComponent, title: "Instagram"},
  { path: 'photo-edit/:id', component: PhotoEditComponent, title: "Instagram"},
  { path: 'photo-create', component: PhotoCreateComponent, title: "Instagram"},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
