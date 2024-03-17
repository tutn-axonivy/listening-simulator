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
import { filter } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';

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
    private testService: TestService,
    private dialog: MatDialog
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

  onDeleteClick(quizId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
    });

    dialogRef.componentInstance.title = 'Warning';
    dialogRef.componentInstance.message = 'Confirm to delete this?';

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) {
        this.deleteQuiz(quizId);
      }
    });
  }

  deleteQuiz(quizId: any) {
    this.quizService.deleteQuiz(quizId).subscribe(() => {
      this.quizzes = filter(this.quizzes, (quiz) => quiz.id !== quizId);
    });
  }
}
