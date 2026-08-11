import { TestBed } from '@angular/core/testing';
import { DataSourceService } from './data-source-service';
import { environment } from '../../../../environments/environment';

describe('DataSourceService', () => {
  let service: DataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize current() with the environment dataSource value', () => {

  });

  it('should report isMock() consistently with current()', () => {

  });

  it('should report isApi() consistently with current()', () => {

  });

  it('isMock() and isApi() should be mutually exclusive', () => {

  });
});