import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDrawerComponent } from './account-drawer';
import { ThemeService } from '../../services/theme/theme-service';

describe('AccountDrawerComponent', () => {
  let component: AccountDrawerComponent;
  let fixture: ComponentFixture<AccountDrawerComponent>;

  const mockThemeService = jasmine.createSpyObj('ThemeService', ['toggle', 'isDark']);

  beforeEach(async () => {
    mockThemeService.isDark.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [AccountDrawerComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template rendering', () => {

    it('should render the backdrop');

    it('should render the aside with role dialog');

    it('should render the drawer title');

    it('should render the close button');

    it('should render all menu items');

    it('should render the dark mode toggle');

    it('should render the logout button');

  });

  describe('Output: close', () => {

    it('should emit close when onClose is called');

    it('should emit close when backdrop is clicked');

    it('should emit close when close button is clicked');

  });

  describe('Output: logout', () => {

    it('should emit logout when onLogout is called');

    it('should emit logout when logout button is clicked');

  });

  describe('onLogout method', () => {

    it('should emit both logout and close when onLogout is called');

  });

  describe('Accessibility', () => {

    it('should have aria-hidden on backdrop');

    it('should have aria-label on the aside');

    it('should have aria-label on the close button');

    it('should have aria-hidden on icons');

  });

});
