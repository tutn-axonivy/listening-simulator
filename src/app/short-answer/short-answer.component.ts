import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@wfpena/angular-wysiwyg';

@Component({
  selector: 'app-short-answer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularEditorModule,
  ],
  templateUrl: './short-answer.component.html',
  styleUrl: './short-answer.component.css',
})
export class ShortAnswerComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.question)
  }
  @Input() question: any;
  @Input() isEditting: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() isTesting: boolean = false;

  addChoice() {
    this.question.choices.push({ index: '', content: '' });
  }

  removeChoice(index: number) {
    this.question.choices.splice(index, 1);
  }
}
