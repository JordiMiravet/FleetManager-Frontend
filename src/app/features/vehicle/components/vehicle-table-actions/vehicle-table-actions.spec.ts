import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTableActionsComponent } from './vehicle-table-actions';

describe('VehicleTableActionsComponent', () => {
  let component: VehicleTableActionsComponent;
  let fixture: ComponentFixture<VehicleTableActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTableActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
