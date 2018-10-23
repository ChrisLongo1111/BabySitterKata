import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BabySitterService {
  private static readonly EarliestStartTime = 17;
  private static readonly MaxEndTime = 4;
  private static readonly RateTillBedTime: number = 12;
  private static readonly RateBedTimeTillMidNight: number = 8;
  private static readonly RateMidNightTillEnd: number = 16;
  private static readonly MidNight: number = 24;

  private startTime: number;
  private endTime: number;
  private bedTime: number;

  constructor() { }

  public setTimes(startTime: number, endTime: number, bedTime: number): void {
    const times = [startTime, bedTime, endTime];

    const self = this;
    times.forEach(function(time: number) {
      if (!self.isMilitaryTime(time)){
        throw new Error('Time is not a military time');
      }
    })

    if (startTime < BabySitterService.EarliestStartTime && startTime > BabySitterService.MaxEndTime) {
        throw new Error('Cannot schedule start time at ' + startTime);
    }

    if (endTime > BabySitterService.MaxEndTime && endTime < BabySitterService.EarliestStartTime) {
        throw new Error('Cannot schedule stop time at ' + endTime);
    }

    const startTimeWithOffset = this.applyOffset(startTime);
    const bedTimeWithOffset = this.applyOffset(bedTime);
    const stopTimeWithOffset = this.applyOffset(endTime);

    if (!(startTimeWithOffset <= stopTimeWithOffset
        && startTimeWithOffset <= bedTimeWithOffset
        && bedTimeWithOffset <= stopTimeWithOffset)) {
        throw new Error('Order of times should be start time <= bed time <= stop time');
    }    

    this.startTime = startTime;
    this.endTime = endTime;
    this.bedTime = bedTime;
  }

  calculate(): number {
    const startWithOffset = this.applyOffset(this.startTime);
    const bedWithOffset = this.applyOffset(this.bedTime);
    const stopWithOffset = this.applyOffset(this.endTime);

    let charge: number = 0;

    for (let time = startWithOffset; time < stopWithOffset; time++) {
        if (time < bedWithOffset) {
            charge += BabySitterService.RateTillBedTime;
        } else if (time < BabySitterService.MidNight) {
            charge += BabySitterService.RateBedTimeTillMidNight;
        } else {
            charge += BabySitterService.RateMidNightTillEnd;
        }
    }
    return charge;
  }
 
  private isMilitaryTime(time: number): boolean {
    return time >= 0 && time < 24;
  }
  
  private applyOffset(time: number): number {
    let timeWithOffset = 0;

    if (time <= BabySitterService.MaxEndTime) {
      timeWithOffset = time + 24;
    } else {
      timeWithOffset = time;
    }
    return timeWithOffset;
  }
}
