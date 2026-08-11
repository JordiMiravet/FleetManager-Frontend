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

  describe('current()', () => {
    it('should return the environment dataSource value', () => {

    });
  });

  describe('isMock()', () => {
    it('should return true when current dataSource is mock', () => {

    });
  });

  describe('isApi()', () => {
    it('should return true when current dataSource is api', () => {

    });
  });

  describe('isMock() and isApi()', () => {
    it('should be mutually exclusive', () => {

    });
  });
});