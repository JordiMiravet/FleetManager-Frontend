import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';

import { GraphicsServices } from './graphics-services';

import { VehicleService } from '../../vehicle/services/vehicle-service/vehicle-service';
import { VehicleInterface } from '../../vehicle/interfaces/vehicle/vehicle';

export const authMock = {
  currentUser: {
    uid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
};

describe('GraphicsServices', () => {
  let service: GraphicsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Auth, useValue: authMock },
      ]
    });
    service = TestBed.inject(GraphicsServices);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
