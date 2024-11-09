/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display Login button when user is not logged in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();

    const loginButton = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
    const logoutButton = fixture.debugElement.query(By.css('button'));

    expect(loginButton).toBeTruthy();
    expect(logoutButton).toBeNull();
  });

  it('should display Logout button when user is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const loginButton = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
    const logoutButton = fixture.debugElement.query(By.css('button'));

    expect(logoutButton).toBeTruthy();
    expect(loginButton).toBeNull();
  });

  it('should call logout method when Logout button is clicked', () => {
    component.isLoggedIn = true;
    spyOn(component, 'logout');
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('button'));
    logoutButton.nativeElement.click();

    expect(component.logout).toHaveBeenCalled();
  });
});
