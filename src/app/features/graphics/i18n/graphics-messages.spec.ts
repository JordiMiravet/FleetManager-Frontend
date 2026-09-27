import { TestBed } from '@angular/core/testing';

import { GraphicsMessagesService } from './graphics-messages';

describe('GraphicsMessagesService', () => {
  let service: GraphicsMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicsMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
