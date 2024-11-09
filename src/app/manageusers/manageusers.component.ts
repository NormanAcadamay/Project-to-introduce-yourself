import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
  users: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // โหลดข้อมูลผู้ใช้จาก localStorage
  loadUsers(): void {
    const usersData = localStorage.getItem('users');
    this.users = usersData ? JSON.parse(usersData) : [];
  }

  // ลบผู้ใช้ตาม index ที่กำหนด
  deleteUser(index: number): void {
    Swal.fire({
      title: 'คุณต้องการลบผู้ใช้นี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        // ลบผู้ใช้จากรายการ
        this.users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(this.users));
        Swal.fire('ลบสำเร็จ!', 'ผู้ใช้ได้ถูกลบแล้ว', 'success');
      }
    });
  }
}
