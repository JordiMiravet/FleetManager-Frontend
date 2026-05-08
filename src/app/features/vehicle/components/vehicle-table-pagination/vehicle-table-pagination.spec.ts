import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Auth} from '@angular/fire/auth';

import { VehicleTablePaginationComponent } from './vehicle-table-pagination';

describe('VehicleTablePaginationComponent', () => {
  let component: VehicleTablePaginationComponent;
  let fixture: ComponentFixture<VehicleTablePaginationComponent>;

  const authMock = {
    currentUser: {
      uid: 'JordiTheBest',
      getIdToken: () => Promise.resolve('MyToken')
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VehicleTablePaginationComponent,
        HttpClientModule,
      ],
      providers: [
        { provide: Auth, useValue: authMock },
      ]
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
