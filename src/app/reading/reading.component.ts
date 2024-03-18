import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@wfpena/angular-wysiwyg';
import { CommonUtils } from '../../utils/common-utils';
import { MultipleChoicesComponent } from '../multiple-choices/multiple-choices.component';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';
import { ReadingService } from './reading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reading',
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
    MatIconModule,
    MatExpansionModule,
    AngularEditorModule,
  ],
  providers: [ReadingService],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.css',
})
export class ReadingComponent {
  @Input() isEditting: boolean = true;

  currentParagraph: any = {
    id: '',
    content: '',
    questions: [],
  };

  panelOpenState = false;

  currentQuiz: any = {
    name: '',
    timeout: null,
    paragraphs: [],
  };

  currentQuestion: any = {
    content: '',
    description: '',
    type: null,
    choices: [],
  };

  subscription: Subscription[] = [];

  config: AngularEditorConfig = {
    editable: true,
  };

  constructor(
    private readingService: ReadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((paramMap: any) => {
      const quizId = paramMap.get('quizId');
      if (quizId) {
        this.readingService.getById(quizId).subscribe((quiz: any) => {
          this.currentQuiz = quiz;
          console.log(this.currentQuiz);
        });
      }
    });
  }

  addParagraph() {
    const newParagraph = {
      id: CommonUtils.generateRandomId(),
      name: '',
      questions: [],
    };
    this.currentQuiz.paragraphs.push({ ...this.currentParagraph });
    this.currentQuiz = { ...this.currentQuiz };
  }

  addQuestion(paragraphIndex: number, questionType: number) {
    switch (questionType) {
      case 1:
        this.currentQuestion = {
          id: CommonUtils.generateRandomId(),
          content: '',
          type: questionType,
          choices: [],
        };
        break;
      case 2:
        this.currentQuestion = {
          id: CommonUtils.generateRandomId(),
          content: '',
          type: questionType,
          choices: this.defaultMultipleChoices(),
        };
        break;
      default:
        break;
    }
    this.currentQuiz.paragraphs[paragraphIndex].questions.push({
      ...this.currentQuestion,
    });
  }

  removeQuestion(paragraphIndex: number, questionIdex: number) {
    this.currentQuiz.paragraphs[paragraphIndex].questions.splice(
      questionIdex,
      1
    );
  }

  removeParagraph(paragraphIndex: number) {
    this.currentQuiz.paragraphs[paragraphIndex].questions.splice(
      paragraphIndex,
      1
    );
  }

  saveReadingTest() {
    this.currentQuiz.id = CommonUtils.generateRandomId();
    this.readingService.createReadingTest(this.currentQuiz).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  defaultMultipleChoices() {
    const choices = [];
    for (let i = 0; i < 4; i++) {
      const choice = {
        id: CommonUtils.generateRandomId(),
        content: '',
      };
      choices.push(choice);
    }
    return choices;
  }

  defaultShortAnswerChoices() {
    const choices = [];
    for (let i = 0; i < 4; i++) {
      const choice = {
        id: CommonUtils.generateRandomId(),
        content: '',
        index: '',
      };
      choices.push(choice);
    }
    return choices;
  }

  saveQuestion() {
    this.currentQuestion = {
      name: '',
      time: null,
      choices: [],
    };
  }

  onSaveClick() {
    this.saveOrEditQuiz(this.currentQuiz);
  }

  saveOrEditQuiz(quiz: any) {
    let observer;
    if (quiz.id) {
      observer = this.readingService.editReadingTest(quiz);
    } else {
      quiz.id = CommonUtils.generateRandomId();
      observer = this.readingService.createReadingTest(quiz);
    }
    const sub = observer.subscribe(() => {
      this.router.navigate(['/']);
    });
    this.subscription.push(sub);
  }
}
