import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTableActions } from './vehicle-table-actions';

describe('VehicleTableActions', () => {
  let component: VehicleTableActions;
  let fixture: ComponentFixture<VehicleTableActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTableActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTableActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
