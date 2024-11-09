// user.service.ts
import { Injectable } from '@angular/core';

export interface User {
  id: number;
  fristName: string;
  role: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, fristName: 'ติวเตอร์', role: 'User', description: 'This is the user profile of John.' },
    { id: 2, fristName: 'แมน', role: 'Friend', description: 'This is the profile of Jane, a friend.' },
    { id: 3, fristName: 'แอดมิน', role: 'Admin', description: 'This is the admin profile of Bob.' }
  ];

  getUsers(): User[] {
    return this.users;
  }
}
