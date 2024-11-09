import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // เพิ่ม RegisterComponent
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // เพิ่มเส้นทางไปยังหน้า Register
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
