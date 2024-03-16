import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  baseUrl: string = 'http://localhost:3000/quizzes';

  constructor(private httpClient: HttpClient) {}

  getAllQuiz(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  createQuiz(quiz: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, quiz);
  }

  uploadAudioFile(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.httpClient.post<any>('http://localhost:3000/upload', formData);
  }
}
