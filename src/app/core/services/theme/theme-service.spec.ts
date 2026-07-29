import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark-mode');

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    document.body.classList.remove('dark-mode');
    localStorage.clear();
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
      localStorage.setItem('darkMode', 'false');

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});

      service = TestBed.inject(ThemeService);

      expect(service.isDark()).toBeFalse();
    });
  });

  describe('dark mode effect', () => {
    it('should persist dark mode state and update body class', () => {

    });
  });
});