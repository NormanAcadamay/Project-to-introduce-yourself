import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';  // นำเข้า RegisterComponent
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },  // เพิ่มเส้นทางสำหรับ RegisterComponent
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
