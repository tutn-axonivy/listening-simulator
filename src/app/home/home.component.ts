import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { QuizService } from '../quizzes/quizzes.service';
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
    MatMenuModule,
    MatIconModule,
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

  editQuiz(quizId: any) {
    this.router.navigate(['edit-quiz', quizId]);
  }
}
