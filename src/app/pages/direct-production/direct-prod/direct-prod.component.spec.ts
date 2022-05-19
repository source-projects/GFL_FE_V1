import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectProdComponent } from './direct-prod.component';

describe('DirectProdComponent', () => {
  let component: DirectProdComponent;
  let fixture: ComponentFixture<DirectProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
