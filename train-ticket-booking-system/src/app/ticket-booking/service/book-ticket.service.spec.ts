import { TestBed } from '@angular/core/testing';

import { BookTicketService } from './book-ticket.service';

describe('BookTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookTicketService = TestBed.get(BookTicketService);
    expect(service).toBeTruthy();
  });
});
