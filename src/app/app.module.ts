import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileDialog1Component } from './profiledialog1/profiledialog1.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // นำเข้า AuthGuard ที่คุณสร้างไว้
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ManageusersComponent } from './manageusers/manageusers.component';

// กำหนดเส้นทาง (routes) ของแอปพลิเคชัน
const routes: Routes = [
  { path: '', component: LoginComponent },  // หน้าแรกเป็นหน้า Login
  { path: 'login', component: LoginComponent },  // หน้าแรกเป็นหน้า Login
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [	
    AppComponent,
    UserProfileComponent,
    ProfileDialog1Component,
    HeaderComponent,
    LoginComponent,  // เพิ่ม LoginComponent ใน declarations
    HomeComponent,
      RegisterComponent,
      ManageusersComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)  // เพิ่ม RouterModule พร้อมการกำหนดเส้นทาง
  ],
  providers: [AuthGuard],  // เพิ่ม AuthGuard ใน providers
  bootstrap: [AppComponent]
})
export class AppModule { }
