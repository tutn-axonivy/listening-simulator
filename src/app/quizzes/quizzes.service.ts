import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getAllQuiz(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/quizzes`);
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/quizzes/${id}`);
  }

  createQuiz(quiz: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/quizzes`, quiz);
  }

  editQuiz(quiz: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/quizzes/${quiz.id}`, quiz);
  }

  uploadAudioFile(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.httpClient.post<any>('http://localhost:3000/upload', formData);
  }
}
