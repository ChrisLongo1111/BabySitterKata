import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BabySitterService } from 'src/app/services/baby-sitter.service';

@Component({
  selector: 'app-baby-sitter',
  templateUrl: './baby-sitter.component.html',
  styleUrls: ['./baby-sitter.component.css']
})
export class BabySitterComponent implements OnInit {

  formGroup: FormGroup;
  result: number;
  error: string;

  constructor(private babySitterService: BabySitterService, private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      startTime: ['', Validators.required],
      bedTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.formGroup.get('startTime').valueChanges.subscribe(x => { this.result = 0; });
    this.formGroup.get('bedTime').valueChanges.subscribe(x => { this.result = 0; });
    this.formGroup.get('endTime').valueChanges.subscribe(x => { this.result = 0; });
  }

  calculate(): void {
    try {
      var values = this.formGroup.value;
      this.babySitterService.setTimes(values.startTime, values.endTime, values.bedTime);
      this.result = this.babySitterService.calculate();  
      this.error = undefined;
    }
    catch (error) {
      this.result = 0;
      this.error = error;
    }
  }
}
