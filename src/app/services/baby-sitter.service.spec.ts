import { TestBed, inject } from '@angular/core/testing';

import { BabySitterService } from './baby-sitter.service';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('BabySitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }        
      ]
    });
  });

  it('should be created', inject([BabySitterService], (service: BabySitterService) => {
    expect(service).toBeTruthy();
  }));

  it('should be $108', inject([BabySitterService], (service: BabySitterService) => {
    service.setTimes(17, 2, 22);
    const result = service.calculate();
    const expectResult = 108;
    expect(result).toEqual(expectResult);
  }));

  it('should be $124', inject([BabySitterService], (service: BabySitterService) => {
    service.setTimes(17, 3, 22);
    const result = service.calculate();
    const expectResult = 124;
    expect(result).toEqual(expectResult);
  }));

  it('should be Cannot schedule stop time at 5', inject([BabySitterService], (service: BabySitterService) => {
    expect(function(){ service.setTimes(17, 5, 22); }).toThrow(new Error('Cannot schedule stop time at 5'));
  }));

  it('should be Cannot schedule start time at 14', inject([BabySitterService], (service: BabySitterService) => {
    expect(function(){ service.setTimes(14, 5, 22); }).toThrow(new Error('Cannot schedule start time at 14'));
  }));
});
