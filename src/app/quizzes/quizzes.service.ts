import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private httpClient: HttpClient) {}

  getAllQuiz(): Observable<any> {
    return this.httpClient.get(`/quizzes`);
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`/quizzes/${id}`);
  }

  createQuiz(quiz: any): Observable<any> {
    return this.httpClient.post(`/quizzes`, quiz);
  }

  editQuiz(quiz: any): Observable<any> {
    return this.httpClient.put(`/quizzes/${quiz.id}`, quiz);
  }
}
