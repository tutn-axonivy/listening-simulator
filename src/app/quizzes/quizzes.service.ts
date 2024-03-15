import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private httpClient: HttpClient) {}

  getAllQuiz(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/quizzes');
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/quizzes/${id}`);
  }

  createQuiz(quiz: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/quizzes', quiz);
  }
}
