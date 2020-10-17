import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricInComponent } from './fabric-in.component';

describe('FabricInComponent', () => {
  let component: FabricInComponent;
  let fixture: ComponentFixture<FabricInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
