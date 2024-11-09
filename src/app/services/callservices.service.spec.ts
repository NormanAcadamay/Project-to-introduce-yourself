/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { CallservicesService } from './callservices.service';

describe('Service: Callservices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CallservicesService]
    });
  });

  it('should ...', inject([CallservicesService], (service: CallservicesService) => {
    expect(service).toBeTruthy();
  }));
});
