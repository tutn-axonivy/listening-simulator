import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileService } from '../file.service';
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
  providers: [QuizService, FileService],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.css',
})
export class QuizzesComponent implements OnDestroy {
  fileName: string = '';
  selectedFile: any;
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

  subscription: Subscription[] = [];

  constructor(
    private quizService: QuizService,
    private fileServie: FileService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((paramMap: any) => {
      const quizId = paramMap.get('quizId');
      if (quizId) {
        this.quizService.getById(quizId).subscribe((quiz: any) => {
          this.currentQuiz = quiz;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
  }

  submitForm() {
    this.currentQuiz = {
      name: '',
      timeout: null,
      questions: [],
    };
  }

  onSaveClick() {
    if (this.selectedFile) {
      if (this.selectedFile.name !== this.currentQuiz.fileName) {
        const deleteSub = this.fileServie
          .deleteFile(this.currentQuiz.fileName)
          .subscribe(() => {
            this.uploadFile();
          });
        this.subscription.push(deleteSub);
      }
    } else {
      this.saveOrEditQuiz(this.currentQuiz);
    }
  }

  uploadFile() {
    const uploadSub = this.fileServie
      .uploadAudioFile(this.selectedFile)
      .subscribe((res) => {
        this.subscription.push(uploadSub);
        if (res) {
          this.currentQuiz.fileName = res.fileName;
          this.saveOrEditQuiz(this.currentQuiz);
        }
      });
    this.subscription.push(uploadSub);
  }

  saveOrEditQuiz(quiz: any) {
    let observer;
    if (quiz.id) {
      observer = this.quizService.editQuiz(quiz);
    } else {
      observer = this.quizService.createQuiz(quiz);
    }
    const sub = observer.subscribe(() => {
      this.router.navigate(['/']);
    });
    this.subscription.push(sub);
  }
}
