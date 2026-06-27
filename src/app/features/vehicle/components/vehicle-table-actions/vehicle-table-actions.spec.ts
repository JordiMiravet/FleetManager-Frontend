import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTableActionsComponent } from './vehicle-table-actions';

function createInputEvent(value: string): Event {
  return { target: { value } } as unknown as Event;
}

const defaultFilterState = {
  query: '',
  sortField: 'name' as const,
  sortDir: 'asc' as const
};

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
      component.onQueryChange(createInputEvent('Ferrari'));

      expect(component.query()).toBe('Ferrari');
    });

    it('should emit filterChange with updated query', () => {
      const emitSpy = spyOn(component.filterChange, 'emit');
      component.onQueryChange(createInputEvent('Ferrari'));

      expect(emitSpy).toHaveBeenCalledWith({ ...defaultFilterState, query: 'Ferrari' });
    });

  });

  describe('onSortFieldChange', () => {

    it('should update sortField signal when select changes', () => {
      component.onSortFieldChange(createInputEvent('model'));

      expect(component.sortField()).toBe('model');
    });

    it('should emit filterChange with updated sortField', () => {
      const emitSpy = spyOn(component.filterChange, 'emit');
      component.onSortFieldChange(createInputEvent('plate'));

      expect(emitSpy).toHaveBeenCalledWith({ ...defaultFilterState, sortField: 'plate' });
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

      expect(emitSpy).toHaveBeenCalledWith({ ...defaultFilterState, sortDir: 'desc' });
    });

  });

  describe('template rendering', () => {

    it('should render search input', () => {
      const input = fixture.nativeElement.querySelector('.vehicle-actions__search-input');
      expect(input).toBeTruthy();
    });

    it('should render sort direction button', () => {
      const button = fixture.nativeElement.querySelector('.vehicle-actions__sort-button');
      expect(button).toBeTruthy();
    });

    it('should render sort field select with options', () => {
      const select = fixture.nativeElement.querySelector('.vehicle-actions__sort-select');
      const options = select.querySelectorAll('option');

      expect(select).toBeTruthy();
      expect(options.length).toBe(3);
    });

    it('should show asc icon when sortDir is asc', () => {
      component.sortDir.set('asc');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.vehicle-actions__sort-button i');
      expect(icon.classList).toContain('pi-sort-amount-down');
    });

    it('should show desc icon when sortDir is desc', () => {
      component.sortDir.set('desc');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.vehicle-actions__sort-button i');
      expect(icon.classList).toContain('pi-sort-amount-up');
    });

  });

  describe('template interactions', () => {

    it('should call onQueryChange when typing in search input', () => {
      const spy = spyOn(component, 'onQueryChange');

      const input: HTMLInputElement = fixture.nativeElement.querySelector('.vehicle-actions__search-input');
      input.dispatchEvent(new Event('input'));

      expect(spy).toHaveBeenCalled();
    });

    it('should call onSortFieldChange when selecting sort field', () => {
      const spy = spyOn(component, 'onSortFieldChange');

      const select: HTMLSelectElement = fixture.nativeElement.querySelector('.vehicle-actions__sort-select');
      select.dispatchEvent(new Event('change'));

      expect(spy).toHaveBeenCalled();
    });

    it('should call toggleSortDir when clicking sort button', () => {
      const spy = spyOn(component, 'toggleSortDir');

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('.vehicle-actions__sort-button');
      button.click();

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('accessibility', () => {

    it('should have aria-label on search input', () => {
      const input = fixture.nativeElement.querySelector('.vehicle-actions__search-input');
      expect(input.getAttribute('aria-label')).toBe(component.actionsMsg.aria.searchInput);
    });

    it('should have aria-label on sort direction button', () => {
      const button = fixture.nativeElement.querySelector('.vehicle-actions__sort-button');
      expect(button.getAttribute('aria-label')).toBe(component.actionsMsg.aria.sortDirButton);
    });

    it('should have aria-label on sort field select', () => {
      const select = fixture.nativeElement.querySelector('.vehicle-actions__sort-select');
      expect(select.getAttribute('aria-label')).toBe(component.actionsMsg.aria.sortFieldSelect);
    });

    it('should have aria-hidden on search icon', () => {
      const icon = fixture.nativeElement.querySelector('.vehicle-actions__search-icon');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

  }); 

});