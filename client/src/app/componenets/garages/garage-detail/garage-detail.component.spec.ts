import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageDetailComponent } from './garage-detail.component';

describe('GarageDetailComponent', () => {
  let component: GarageDetailComponent;
  let fixture: ComponentFixture<GarageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
