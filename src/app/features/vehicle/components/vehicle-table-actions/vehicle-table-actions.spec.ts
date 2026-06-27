import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTableActionsComponent } from './vehicle-table-actions';

describe('VehicleTableActionsComponent', () => {
  let component: VehicleTableActionsComponent;
  let fixture: ComponentFixture<VehicleTableActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTableActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {

    it('should initialize query as empty string', () => {
      expect(component.query()).toBe('');
    });

    it('should initialize sortField as "name"', () => {
      expect(component.sortField()).toBe('name');
    });

    it('should initialize sortDir as "asc"', () => {
      expect(component.sortDir()).toBe('asc');
    });

  });

  describe('onQueryChange', () => {

    it('should update query signal when input changes', () => {
      const event = { target: { value: 'Ferrari' } } as unknown as Event;
      component.onQueryChange(event);

      expect(component.query()).toBe('Ferrari');
    });

    it('should emit filterChange with updated query', () => {
      const emitSpy = spyOn(component.filterChange, 'emit');
      const event = { target: { value: 'Ferrari' } } as unknown as Event;

      component.onQueryChange(event);

      expect(emitSpy).toHaveBeenCalledWith({
        query: 'Ferrari',
        sortField: 'name',
        sortDir: 'asc'
      });
    });

  });

  describe('onSortFieldChange', () => {

    it('should update sortField signal when select changes', () => {
      const event = { target: { value: 'model' } } as unknown as Event;
      component.onSortFieldChange(event);

      expect(component.sortField()).toBe('model');
    });

    it('should emit filterChange with updated sortField', () => {
      const emitSpy = spyOn(component.filterChange, 'emit');
      const event = { target: { value: 'plate' } } as unknown as Event;

      component.onSortFieldChange(event);

      expect(emitSpy).toHaveBeenCalledWith({
        query: '',
        sortField: 'plate',
        sortDir: 'asc'
      });
    });

  });

  describe('toggleSortDir', () => {

    it('should toggle sortDir from asc to desc', () => {
      component.toggleSortDir();

      expect(component.sortDir()).toBe('desc');
    });

    it('should toggle sortDir from desc to asc', () => {
      component.sortDir.set('desc');
      component.toggleSortDir();

      expect(component.sortDir()).toBe('asc');
    });

    it('should emit filterChange after toggling', () => {
      const emitSpy = spyOn(component.filterChange, 'emit');

      component.toggleSortDir();

      expect(emitSpy).toHaveBeenCalledWith({
        query: '',
        sortField: 'name',
        sortDir: 'desc'
      });
    });

  });

  describe('template rendering', () => {

    it('should render search input');

    it('should render sort direction button');

    it('should render sort field select with options');

    it('should show asc icon when sortDir is asc');

    it('should show desc icon when sortDir is desc');

  });

  describe('template interactions', () => {

    it('should call onQueryChange when typing in search input');

    it('should call onSortFieldChange when selecting sort field');

    it('should call toggleSortDir when clicking sort button');

  });

  describe('accessibility', () => {

    it('should have aria-label on search input');

    it('should have aria-label on sort direction button');

    it('should have aria-label on sort field select');

    it('should have aria-hidden on search icon');

  });

});