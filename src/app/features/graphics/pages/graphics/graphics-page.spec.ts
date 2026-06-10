import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from '@angular/fire/auth';

import { GraphicsPageComponent } from './graphics-page';

export const authMock = {
  currentUser: {
    userUid: 'JordiTheBest',
    getIdToken: () => Promise.resolve('MyToken')
  }
}

describe('GraphicsPageComponent', () => {
  let component: GraphicsPageComponent;
  let fixture: ComponentFixture<GraphicsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GraphicsPageComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Auth, useValue: authMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicsPageComponent);
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
