import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toggle', () => {
    it('should toggle dark mode state', () => {
      const initialValue = service.isDark();

      service.toggle();

      expect(service.isDark()).toBe(!initialValue);
    });
  });

  describe('initialization', () => {
    it('should initialize dark mode from local storage', () => {

    });
  });
});