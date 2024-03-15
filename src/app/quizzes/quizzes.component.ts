import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MultipleChoicesComponent } from '../multiple-choices/multiple-choices.component';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';
import { QuizService } from './quizzes.service';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MultipleChoicesComponent,
    ShortAnswerComponent,
  ],
  providers: [QuizService],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.css',
})
export class QuizzesComponent implements OnInit {
  fileName: string = '';
  currentQuiz: any = {
    name: '',
    timeout: null,
    questions: [],
  };
  currentQuestion: any = {
    title: '',
    description: '',
    type: null,
    choices: [],
  };

  constructor(private quizService: QuizService, private router: Router) {}
  ngOnInit(): void {}

  addQuestion(questionType: number) {
    switch (questionType) {
      case 0:
        this.currentQuestion = {
          title: '',
          type: questionType,
          description: '',
          choices: [
            {
              id: 1,
              content: '',
              isSelected: false,
            },
            {
              id: 2,
              content: '',
              isSelected: false,
            },
            {
              id: 3,
              content: '',
              isSelected: false,
            },
            {
              id: 4,
              content: '',
              isSelected: false,
            },
          ],
        };
        break;
      case 1:
        this.currentQuiz.questions.push({ ...this.currentQuestion });
        this.currentQuestion = {
          title: '',
          type: questionType,
          description: '',
          choices: [
            {
              id: 1,
              content: '',
              index: '',
            },
            {
              id: 2,
              content: '',
              index: '',
            },
            {
              id: 3,
              content: '',
              index: '',
            },
            {
              id: 4,
              content: '',
              index: '',
            },
          ],
        };
        break;
      default:
        break;
    }
    this.currentQuiz.questions.push({ ...this.currentQuestion });
    this.currentQuiz = { ...this.currentQuiz };
  }

  saveQuestion() {
    this.currentQuestion = {
      name: '',
      time: null,
      choices: [],
    };
  }

  removeQuestion(index: number) {
    this.currentQuiz.questions.splice(index, 1);
  }

  submitForm() {
    this.currentQuiz = {
      name: '',
      timeout: null,
      questions: [],
    };
  }

  saveQuiz() {
    this.currentQuiz.fileUrl = `assets/${this.fileName}`;
    this.quizService.createQuiz(this.currentQuiz).subscribe();
    this.router.navigate(['/']);
  }
}
