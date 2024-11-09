import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialog1Component } from '../profiledialog1/profiledialog1.component';
import Swal from 'sweetalert2';

interface Profile {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;
  age: number;
  birthday: string;
  phone: string;
  image?: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profiles: Profile[] = [];
  isAdmin: boolean = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่
    const userDetail = JSON.parse(sessionStorage.getItem('userDetail') || '{}');
    this.isAdmin = userDetail.username === 'admin' && userDetail.password === '1234';

    // โหลดโปรไฟล์จาก localStorage
    const savedProfiles = localStorage.getItem('profiles');
    this.profiles = savedProfiles ? JSON.parse(savedProfiles) : [];
  }

  // ดูข้อมูลในโหมดอ่านอย่างเดียว
  viewProfile(profile: Profile): void {
    this.dialog.open(ProfileDialog1Component, {
      width: '800px',
      data: { ...profile, readonly: true }
    });
  }

  // ฟังก์ชันแก้ไขโปรไฟล์ (ผู้ใช้ทุกคนสามารถแก้ไขได้)
  editProfile(index: number): void {
    const dialogRef = this.dialog.open(ProfileDialog1Component, {
      width: '800px',
      data: { ...this.profiles[index] }
    });

    dialogRef.afterClosed().subscribe((result: Profile) => {
      if (result) {
        this.profiles[index] = result;
        this.saveProfiles();
      }
    });
  }

  // ฟังก์ชันเพิ่มโปรไฟล์ (เฉพาะ admin)
  startAdding(): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(ProfileDialog1Component, {
        width: '800px'
      });

      dialogRef.afterClosed().subscribe((result: Profile) => {
        if (result) {
          this.profiles.push(result);
          this.saveProfiles();
        }
      });
    } else {
      Swal.fire('สิทธิ์ไม่เพียงพอ', 'เฉพาะผู้ดูแลระบบเท่านั้นที่สามารถเพิ่มข้อมูลได้', 'error');
    }
  }

  // ฟังก์ชันลบโปรไฟล์ (เฉพาะ admin)
  deleteProfile(index: number): void {
    if (this.isAdmin) {
      Swal.fire({
        title: 'คุณต้องการลบโปรไฟล์นี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ลบเลย',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.profiles.splice(index, 1);
          this.saveProfiles();
          Swal.fire('ลบสำเร็จ!', 'โปรไฟล์ได้ถูกลบแล้ว', 'success');
        }
      });
    } else {
      Swal.fire('สิทธิ์ไม่เพียงพอ', 'เฉพาะผู้ดูแลระบบเท่านั้นที่สามารถลบข้อมูลได้', 'error');
    }
  }

  // บันทึกโปรไฟล์ลง localStorage
  saveProfiles(): void {
    localStorage.setItem('profiles', JSON.stringify(this.profiles));
  }
}
