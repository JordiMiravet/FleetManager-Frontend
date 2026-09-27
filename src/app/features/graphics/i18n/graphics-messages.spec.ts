import { TestBed } from '@angular/core/testing';

import { GraphicsMessages } from './graphics-messages';

describe('GraphicsMessages', () => {
  let service: GraphicsMessages;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicsMessages);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
