import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PhotoModule } from './photo/photo.module';
import { PhotoCreateComponent } from './photo-create/photo-create.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PhotoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
