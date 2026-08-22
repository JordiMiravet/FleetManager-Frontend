import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationCard } from './invitation-card';

describe('InvitationCard', () => {
  let component: InvitationCard;
  let fixture: ComponentFixture<InvitationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
