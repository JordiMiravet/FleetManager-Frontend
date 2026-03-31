import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDrawer } from './account-drawer';

describe('AccountDrawer', () => {
  let component: AccountDrawer;
  let fixture: ComponentFixture<AccountDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
