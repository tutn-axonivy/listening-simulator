import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { each, toArray } from 'lodash-es';
import { FileService } from '../file.service';
import { MultipleChoicesComponent } from '../multiple-choices/multiple-choices.component';
import { QuizService } from '../quizzes/quizzes.service';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';
import { TestService } from './test.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { Subscription, interval } from 'rxjs';
import { Quiz } from '../../common/models/quiz.model';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    MultipleChoicesComponent,
    ShortAnswerComponent,
    CommonModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [QuizService, TestService],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  audioUrl: string = '';
  result: any = {
    name: '',
    timeout: null,
    questions: [],
    studentName: null,
  };
  quiz: Quiz = {
    id: '',
    name: '',
    timeout: null,
    questions: [],
    audioName: '',
    parts: [],
  };
  subscriptions: Subscription[] = [];
  mapQuestionById: Record<string, any> = {};

  minutes: number = 0;
  seconds: number = 0;
  totalSeconds: number = 0;
  interval = {};
  isReady: boolean = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private testService: TestService,
    private fileService: FileService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.route.paramMap.subscribe((paramMap: any) => {
      const quizId = paramMap.get('quizId');
      if (quizId) {
        this.quizService.getById(quizId).subscribe((quiz: any) => {
          this.quiz = quiz;
          this.totalSeconds = quiz.timeout * 60;
          this.minutes = Math.floor(this.totalSeconds / 60);
          this.seconds = this.totalSeconds % 60;
          this.generateMapQuestion(quiz.questions);
          this.getAudioFile(quiz.audioName);
          console.log(this.quiz);
        });
      }
    });
  }

  generateMapQuestion(questions: any[]) {
    questions.forEach((question) => {
      this.mapQuestionById[question.id] = question;
    });
  }

  getAudioFile(fileName: string) {
    this.fileService.getFile(fileName).subscribe((audioFile: Blob) => {
      const fileURL = URL.createObjectURL(audioFile);
      const audioElement: HTMLAudioElement = this.audioPlayer.nativeElement;
      this.audioUrl = fileURL;
      audioElement.load();
    });
  }

  onSubmitClick() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Information';
    dialogRef.componentInstance.message = 'Submit this test?';
    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) {
        this.submit();
      }
    });
  }

  submit() {
    this.result.questions = toArray(this.mapQuestionById);
    this.result.testDate = this.getCurrentDate();
    this.result.quizId = this.quiz.id;
    this.result.name = this.quiz.name;
    this.calculatePoint();
    this.testService.submitTest(this.result).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  onStartTest() {
    this.isReady = true;
    this.audioPlayer.nativeElement.play();
    this.startTimer();
    setTimeout(() => {
      this.submit();
    }, this.totalSeconds * 1000);
  }

  startTimer() {
    const sub = interval(1000).subscribe(() => {
      if (this.seconds === 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
    });
    this.subscriptions.push(sub);
  }

  onMultipleChoiceSelect(choiceId: string, questionId: string) {
    this.mapQuestionById[questionId] = {
      ...this.mapQuestionById[questionId],
      answer: choiceId,
    };
  }

  private getCurrentDate() {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  private calculatePoint() {
    let totalPoint = 0;
    let correctPoint = 0;
    each(this.result.questions, (question) => {
      if (question.type === 0) {
        // Multiple choices
        totalPoint++;
        if (question.answer === question.correctAnswer) {
          correctPoint++;
        }
      }

      if (question.type === 1) {
        // Short answer
        each(question.choices, (choice) => {
          totalPoint++;
          if (choice.answer === choice.content) {
            correctPoint++;
          }
        });
      }
    });
    this.result.totalPoint = totalPoint;
    this.result.correctPoint = correctPoint;
  }

  ngOnDestroy() {
    each(this.subscriptions, (sub) => {
      sub.unsubscribe();
    });
  }
}
