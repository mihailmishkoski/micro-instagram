import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoEditComponent } from './photo-edit.component';

describe('PhotoEditComponent', () => {
  let component: PhotoEditComponent;
  let fixture: ComponentFixture<PhotoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoEditComponent]
    });
    fixture = TestBed.createComponent(PhotoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
