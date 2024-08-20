import { TestBed } from '@angular/core/testing';

import { FormtypesService } from './formtypes.service';

describe('FormtypesService', () => {
  let service: FormtypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormtypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
