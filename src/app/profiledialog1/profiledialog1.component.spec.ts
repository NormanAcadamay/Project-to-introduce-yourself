import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileDialog1Component } from './profiledialog1.component';

describe('ProfileDialog1Component', () => {
  let component: ProfileDialog1Component;
  let fixture: ComponentFixture<ProfileDialog1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDialog1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDialog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
