/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageusersComponent } from './manageusers.component';

describe('ManageusersComponent', () => {
  let component: ManageusersComponent;
  let fixture: ComponentFixture<ManageusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
