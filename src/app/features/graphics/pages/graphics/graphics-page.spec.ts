import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsComponent } from './graphics-page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';

export const authMock = {
  currentUser: {
    userUid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
}

describe('GraphicsComponent', () => {
  let component: GraphicsComponent;
  let fixture: ComponentFixture<GraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GraphicsComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Auth, useValue: authMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('child components rendering', () => {

    it('should render graphics-view component', () => {
      const graphicsComponent = fixture.nativeElement.querySelector('app-graphics-view');
      expect(graphicsComponent).toBeTruthy();
    });

  });
});
