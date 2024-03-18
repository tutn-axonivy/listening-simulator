import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ReadingService {
  baseUrl: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getAllReadingTest(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/reading`);
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/reading/${id}`);
  }

  createReadingTest(readingTest: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/reading`, readingTest);
  }

  editReadingTest(readingTest: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/reading/${readingTest.id}`, readingTest);
  }
}
