import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // ตรวจสอบว่า sessionStorage ใช้งานได้หรือไม่
    if (typeof sessionStorage !== 'undefined') {
      const userDetail = JSON.parse(sessionStorage.getItem('userDetail') || '{}');
      // ตรวจสอบว่ามีการเข้าสู่ระบบหรือไม่
      if (userDetail.username) {
        return true; // ให้เข้าถึงหน้านี้ได้หากเข้าสู่ระบบแล้ว
      }
    }

    Swal.fire('Access Denied', 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้', 'error');
    this.router.navigate(['/login']);
    return false; // ปฏิเสธการเข้าถึงหากไม่ได้เข้าสู่ระบบ
  }
}
