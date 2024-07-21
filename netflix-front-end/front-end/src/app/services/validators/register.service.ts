import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly _baseURL: string =
    'http://localhost:5566/api/v1/auth/check-email';

  constructor(private http: HttpClient) {}

  checkEmail(email: string): Observable<boolean> {
    return this.http.post<{ exists: boolean }>(this._baseURL, { email }).pipe(
      debounceTime(500),
      map((result) => result.exists)
    );
  }
}
