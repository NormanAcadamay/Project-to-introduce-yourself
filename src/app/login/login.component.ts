import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    const { username, password } = this.loginForm.value;

    if (username === 'admin' && password === '1234') {
      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.setItem('userDetail', JSON.stringify(this.loginForm.value));
      Swal.fire({
        title: 'เข้าสู่ระบบสำเร็จ',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        this.router.navigate(['/user-profile']).then(() => {
          window.location.reload();
        });
      });
    } else if (this.loginForm.valid) {
      sessionStorage.setItem('isAdmin', 'false');
      sessionStorage.setItem('userDetail', JSON.stringify(this.loginForm.value));
      Swal.fire({
        title: 'เข้าสู่ระบบสำเร็จ',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        this.router.navigate(['/user-profile']).then(() => {
          window.location.reload();
        });
      });
    } else {
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  logout(): void {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('userDetail');
    Swal.fire({
      title: 'ออกจากระบบสำเร็จ',
      icon: 'success',
      confirmButtonText: 'ตกลง'
    }).then(() => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
  }
}
