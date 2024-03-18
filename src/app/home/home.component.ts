import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { debounce, each, filter } from 'lodash-es';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { QuizService } from '../quizzes/quizzes.service';
import { TestService } from '../test/test.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [QuizService, TestService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  quizzes: any[] = [];
  results: any[] = [];
  searchQuizString: string = '';
  searchResultString: string = '';

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

  onQuizSearch = debounce((event) => this.searchQuiz(), 500);
  onResultSearch = debounce((event) => this.searchResult(), 500);

  searchQuiz() {
    this.quizService
      .searchQuizByName(this.searchQuizString)
      .subscribe((quizzes) => {
        this.quizzes = quizzes;
      });
  }

  searchResult() {
    this.testService
      .getResultByStudentName(this.searchResultString)
      .subscribe((results) => {
        this.results = results;
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

  getConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
    });

    dialogRef.componentInstance.title = 'Warning';
    dialogRef.componentInstance.message = 'Confirm to delete this?';
    return dialogRef;
  }

  onDeleteClick(quizId: number) {
    this.getConfirmDialog()
      .afterClosed()
      .subscribe((isConfirm) => {
        if (isConfirm) {
          this.deleteQuiz(quizId);
        }
      });
  }

  deleteQuiz(deleteQuiz: any) {
    this.quizService.deleteQuiz(deleteQuiz.id).subscribe(() => {
      this.quizzes = filter(this.quizzes, (quiz) => deleteQuiz.id !== quiz.id);
    });
    this.deleteRelatedFile(deleteQuiz);
  }

  deleteRelatedFile(deleteQuiz: any) {
    const obs: Observable<any>[] = [];

    each(deleteQuiz.questions, (question) => {});
  }

  onDeleteResultClick(resultId: string) {
    this.getConfirmDialog()
      .afterClosed()
      .subscribe((isConfirm) => {
        if (isConfirm) {
          this.deleteResult(resultId);
        }
      });
  }

  deleteResult(resultId: string) {
    this.testService.deleteResultById(resultId).subscribe(() => {
      this.results = filter(this.results, (result) => result.id !== resultId);
    });
  }
}
