import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobreqDetailsComponent } from './jobreq-details.component';

describe('JobreqDetailsComponent', () => {
  let component: JobreqDetailsComponent;
  let fixture: ComponentFixture<JobreqDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobreqDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobreqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
