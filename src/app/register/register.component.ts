import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nickName: [''],
      age: [null, [Validators.required, Validators.min(1)]],
      birthday: ['', Validators.required],
      phone: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value ? null : { mismatch: true };
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;

      // ดึงข้อมูลสมาชิกที่มีอยู่จาก localStorage
      const existingProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');

      // ตรวจสอบว่า username ซ้ำหรือไม่
      const isUsernameTaken = existingProfiles.some((profile: any) => profile.username === newUser.username);

      if (isUsernameTaken) {
        Swal.fire({
          title: 'ชื่อผู้ใช้นี้มีอยู่แล้ว',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
        return;
      }

      // เพิ่มข้อมูลผู้ใช้ใหม่ใน existingProfiles
      existingProfiles.push(newUser);
      localStorage.setItem('profiles', JSON.stringify(existingProfiles));

      Swal.fire({
        title: 'สมัครสมาชิกสำเร็จ',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        this.router.navigate(['/login']);
      });
    } else {
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
    }
  }
}
