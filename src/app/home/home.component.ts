import { Component } from '@angular/core';
import { QuizService } from '../quizzes/quizzes.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TestService } from '../test/test.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
  ],
  providers: [QuizService, TestService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  quizzes: any[] = [];
  results: any[] = [];

  constructor(
    private quizService: QuizService,
    private router: Router,
    private testService: TestService
  ) {
    this.quizService.getAllQuiz().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });

    this.testService.getAllResult().subscribe((quizzes) => {
      this.results = quizzes;
    });
  }

  testTest(id: number) {
    this.router.navigate(['/test', id]);
  }

  viewResult(id: number) {
    this.router.navigate(['results', id]);
  }

  addNewQuiz() {
    this.router.navigate(['add-quiz']);
  }
}
