import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallservicesService {
  private API_ENDPOINT = 'https://your-api-endpoint.com'; // กำหนด API endpoint ของคุณ

  constructor(private http: HttpClient) { }

  // ฟังก์ชัน authen สำหรับการตรวจสอบการล็อกอิน
  authen(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_ENDPOINT}/login/authen`, { userName, password });
  }
}
