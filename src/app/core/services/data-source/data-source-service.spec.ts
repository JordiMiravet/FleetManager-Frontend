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

  describe('data source type checks', () => {
    it('should report isMock() consistently with current()', () => {
      expect(service.isMock()).toBe(service.current() === 'mock');
    });

    it('should report isApi() consistently with current()', () => {
      expect(service.isApi()).toBe(service.current() === 'api');
    });

    it('should ensure isMock() and isApi() are mutually exclusive', () => {
      expect(service.isMock()).not.toBe(service.isApi());
    });
  });
});