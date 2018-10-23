import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabySitterComponent } from './baby-sitter.component';
import { AppModule } from 'src/app/app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('BabySitterComponent', () => {
  let component: BabySitterComponent;
  let fixture: ComponentFixture<BabySitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [  ],
      providers:[
        { provide: APP_BASE_HREF, useValue : '/' }        
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabySitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
