import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTablePagination } from './vehicle-table-pagination';

describe('VehicleTablePagination', () => {
  let component: VehicleTablePagination;
  let fixture: ComponentFixture<VehicleTablePagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTablePagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTablePagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
