import { Component, ElementRef, ViewChild } from '@angular/core';
import { MultipleChoicesComponent } from '../multiple-choices/multiple-choices.component';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { QuizService } from '../quizzes/quizzes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from './test.service';

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
  currentQuiz: any = {
    name: '',
    timeout: null,
    questions: [],
    studentName: '',
  };

  minutes: number = 0;
  seconds: number = 0;
  totalSeconds: number = 0;
  interval: any;
  isReady: boolean = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((paramMap: any) => {
      const quizId = paramMap.get('quizId');
      if (quizId) {
        this.quizService.getById(quizId).subscribe((quiz: any) => {
          this.currentQuiz = quiz;
          this.totalSeconds = quiz.timeout * 60;
          this.minutes = Math.floor(this.totalSeconds / 60);
          this.seconds = this.totalSeconds % 60;
          this.getAudioFile(this.currentQuiz.fileName);
        });
      }
    });
  }

  getAudioFile(fileName: string) {
    this.testService
      .getAudioFile(fileName)
      .subscribe((audioFile: Blob) => {
        const fileURL = URL.createObjectURL(audioFile);
        const audioElement: HTMLAudioElement = this.audioPlayer.nativeElement;
        this.audioUrl = fileURL;
        audioElement.load();
      });
  }

  submit() {
    this.testService.submitTest(this.currentQuiz).subscribe();
    this.router.navigate(['']);
  }

  onStartTest() {
    this.isReady = true;
    this.audioPlayer.nativeElement.play();
    this.startTimer();
    setTimeout(() => {
      this.currentQuiz.isReadOnly = true;
      // this.testService.submitTest(this.currentQuiz).subscribe(() => {
      //   this.router.navigate(['']);
      // });
    }, this.totalSeconds * 1000);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
