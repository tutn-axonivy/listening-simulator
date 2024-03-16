import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TestService {
  constructor(private httpClient: HttpClient) {}

  getAudioFile(fileName: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/file/${fileName}`, {
      responseType: 'blob' as 'json',
    });
  }

  getAllResult(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/results`);
  }

  getResultById(resultId: number): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:3000/results/${resultId}`
    );
  }

  submitTest(result: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/results', result);
  }
}
