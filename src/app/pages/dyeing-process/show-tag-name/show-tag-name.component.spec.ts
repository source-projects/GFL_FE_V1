import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTagNameComponent } from './show-tag-name.component';

describe('ShowTagNameComponent', () => {
  let component: ShowTagNameComponent;
  let fixture: ComponentFixture<ShowTagNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTagNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTagNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
