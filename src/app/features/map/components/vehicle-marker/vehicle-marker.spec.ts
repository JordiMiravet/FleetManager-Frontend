import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMarker } from './vehicle-marker';

describe('VehicleMarker', () => {
  let component: VehicleMarker;
  let fixture: ComponentFixture<VehicleMarker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleMarker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleMarker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
