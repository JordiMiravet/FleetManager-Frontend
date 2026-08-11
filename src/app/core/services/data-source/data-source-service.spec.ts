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
      expect(service.current()).toBe(environment.dataSource);
    });
  });

  describe('isMock()', () => {
    it('should return true when current dataSource is mock', () => {
      expect(service.isMock()).toBe(service.current() === 'mock');
    });
  });

  describe('isApi()', () => {
    it('should return true when current dataSource is api', () => {
      expect(service.isApi()).toBe(service.current() === 'api');
    });
  });

  describe('isMock() and isApi()', () => {
    it('should be mutually exclusive', () => {
      expect(service.isMock()).not.toBe(service.isApi());
    });
  });
});