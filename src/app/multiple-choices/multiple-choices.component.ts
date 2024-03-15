import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
    this.question.choices.forEach((choice: any) => {
      choice.isSelected = false;
    });

    this.question.choices[index].isSelected =
      !this.question.choices[index].isSelected;
  }

  removeChoice(index: number) {
    this.question.choices.splice(index, 1);
  }
}
