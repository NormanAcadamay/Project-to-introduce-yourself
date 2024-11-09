import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ตรวจสอบว่าอยู่ในสภาพแวดล้อมเบราว์เซอร์และ sessionStorage ใช้งานได้
    if (typeof window !== 'undefined' && sessionStorage) {
      const userDetail = sessionStorage.getItem('userDetail');
      if (userDetail) {
        const user = JSON.parse(userDetail);
        this.isLoggedIn = true;
        this.username = user.username; // ดึง username จากข้อมูลผู้ใช้
      }
    }
  }

  logout(): void {
    Swal.fire({
      title: 'คุณต้องการออกจากระบบหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ออกจากระบบ',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        // ตรวจสอบว่า sessionStorage ใช้งานได้
        if (typeof window !== 'undefined' && sessionStorage) {
          sessionStorage.removeItem('userDetail');
        }
        this.isLoggedIn = false;
        this.username = ''; // ล้างข้อมูล username

        // แสดงข้อความออกจากระบบสำเร็จ
        Swal.fire({
          title: 'ออกจากระบบสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then(() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload(); // รีเฟรชหน้าเพื่อเคลียร์สถานะ
          });
        });
      }
    });
  }
}
