import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobreqComponent } from './add-jobreq.component';

describe('AddJobreqComponent', () => {
  let component: AddJobreqComponent;
  let fixture: ComponentFixture<AddJobreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobreqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
