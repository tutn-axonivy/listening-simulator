import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@wfpena/angular-wysiwyg';
@Component({
  selector: 'app-multiple-choices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularEditorModule,
  ],
  templateUrl: './multiple-choices.component.html',
  styleUrl: './multiple-choices.component.css',
})
export class MultipleChoicesComponent {
  @Input() question: any;
  @Input() isEditting: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() isTesting: boolean = false;
  @Output() onValuChange = new EventEmitter();
  selectedAnswer: number | undefined = undefined;
  config: AngularEditorConfig = {};
  CHOICE_INDEX = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  addChoice() {
    this.question.choices.push({ content: '' });
  }

  onSelectChoice(index: number) {
    if (this.isReadOnly) {
      return;
    }

    this.selectedAnswer = this.question.choices[index].id;

    if (this.isEditting) {
      this.question.correctAnswer = this.selectedAnswer;
    }
    if (this.isTesting) {
      this.question.answer = this.selectedAnswer;
      this.onValuChange.emit(this.question.choices[index].id);
    }
  }

  removeChoice(index: number) {
    this.question.choices.splice(index, 1);
  }
}
