import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  const getModal = (): HTMLDialogElement => fixture.nativeElement.querySelector('.modal__backdrop');
  const getForm = (): HTMLFormElement => fixture.nativeElement.querySelector('.modal__form');

  const getConfirmButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('.modal__button--confirm');
  const getCancelButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('.modal__button--cancel');
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default inputs', () => {

    it('should have default title and message', () => {
      expect(component.title()).toBe('Are you sure?');
      expect(component.message()).toBe(
        'Do you really want to proceed? This action cannot be undone'
      );
    });

  });

  describe('Template rendering', () => {

    it('should render the title input in the modal', () => {
      const title: HTMLElement = fixture.nativeElement.querySelector('#confirm-modal__modal-title');

      expect(title.textContent?.trim()).toBe(component.title());
    });

    it('should render the message input in the modal', () => {
      const message: HTMLElement = fixture.nativeElement.querySelector('#confirm-modal__modal-message');

      expect(message.textContent?.trim()).toBe(component.message());
    });

    it('should call onConfirm when Confirm button is clicked', () => {
      const spyConfirm = spyOn(component, 'onConfirm');

      const confirmButton = getConfirmButton();
      confirmButton.click();

      expect(spyConfirm).toHaveBeenCalled();
    });

    it('should call onCancel when Cancel button is clicked', () => {
      const spyCancel = spyOn(component, 'onCancel');

      const cancelButton = fixture.nativeElement.querySelector('.modal__button--cancel');
      cancelButton.click();

      expect(spyCancel).toHaveBeenCalled();
    });

    it('should call onCancel when clicking on modal background', () => {
      const spyCancel = spyOn(component, 'onCancel');

      const modal = getModal();
      modal.click();

      expect(spyCancel).toHaveBeenCalled();
    });

    it('should NOT call onCancel when clicking inside modal form', () => {
      const spyCancel = spyOn(component, 'onCancel');

      const modalForm = getForm();
      modalForm.click();

      expect(spyCancel).not.toHaveBeenCalled();
    });

  });

  describe('Output: confirm', () => {

    it('should emit confirm event when onConfirm is called', () => {
      const spyConfirm = spyOn(component.confirm, 'emit');

      component.onConfirm();

      expect(spyConfirm).toHaveBeenCalled();
    });

    it('should emit confirm event when Confirm button is clicked', () => {
      const spyConfirm = spyOn(component.confirm, 'emit');

      const confirmButton = getConfirmButton();
      confirmButton.click();

      expect(spyConfirm).toHaveBeenCalled();
    });

  });

  describe('Output: cancel', () => {

    it('should emit cancel event when onCancel is called', () => {
      const spyCancel = spyOn(component.cancel, 'emit');

      component.onCancel();

      expect(spyCancel).toHaveBeenCalled();
    });

    it('should emit cancel event when clicking on modal background', () => {
      const spyCancel = spyOn(component.cancel, 'emit');

      const modal = getModal();
      modal.click();

      expect(spyCancel).toHaveBeenCalled();
    });

  });

  describe('Accessibility attributes', () => {

    it('should have aria attributes on the dialog', () => {
      const modal = getModal();

      expect(modal.getAttribute('aria-modal')).toBe('true');
      expect(modal.getAttribute('aria-labelledby')).toBe('confirm-modal__modal-title');
      expect(modal.getAttribute('aria-describedby')).toBe('confirm-modal__modal-message');
    });

  });

  describe('Custom inputs', () => {

    it('should render custom title when provided', () => {
      fixture.componentRef.setInput('title', 'Delete vehicle?');
      fixture.detectChanges();

      const title: HTMLElement = fixture.nativeElement.querySelector('#confirm-modal__modal-title');

      expect(title.textContent?.trim()).toBe('Delete vehicle?');
    });

    it('should render custom message when provided', () => {
      fixture.componentRef.setInput('message', 'This vehicle will be permanently removed');
      fixture.detectChanges();

      const message: HTMLElement = fixture.nativeElement.querySelector('#confirm-modal__modal-message');

      expect(message.textContent?.trim()).toBe('This vehicle will be permanently removed');
    });

  });

  describe('Keyboard interaction', () => {

    it('should call onCancel when Escape key is pressed', () => {
      const spyCancel = spyOn(component, 'onCancel');

      const modal = getModal();
      modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(spyCancel).toHaveBeenCalled();
    });

  });

});
