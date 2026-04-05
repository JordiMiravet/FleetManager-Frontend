import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTablePaginationComponent } from './vehicle-table-pagination';

describe('VehicleTablePaginationComponent', () => {
  let component: VehicleTablePaginationComponent;
  let fixture: ComponentFixture<VehicleTablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTablePaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
