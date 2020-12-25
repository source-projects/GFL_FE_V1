import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShadeComponent } from './add-shade.component';

describe('AddShadeComponent', () => {
  let component: AddShadeComponent;
  let fixture: ComponentFixture<AddShadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
