import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AngularEditorConfig,
  AngularEditorModule,
  UploadResponse,
} from '@wfpena/angular-wysiwyg';
import { FileService } from '../file.service';
import { map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
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
    MatIconModule,
    MatCardModule,
  ],
  providers: [FileService],
  templateUrl: './multiple-choices.component.html',
  styleUrl: './multiple-choices.component.css',
})
export class MultipleChoicesComponent implements OnInit {
  @Input() question: any;
  @Input() isEditting: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() isTesting: boolean = false;
  @Output() onValuChange = new EventEmitter();
  selectedAnswer: number | undefined = undefined;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    if (this.question.imageName) {
      this.getImage(this.question.imageName);
    }
  }

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

  config: AngularEditorConfig = {
    editable: true,
    uploadUrl: 'http://localhost:3000/file',
    upload: (file) => {
      return this.fileService.uploadAudioFile(file).pipe(
        map((response) => {
          const imageName = response.fileName;
          this.question.imageName = imageName;
          this.getImage(imageName);
          return {
            ...response,
            body: { imageUrl: imageName },
          } as HttpResponse<UploadResponse>;
        })
      );
    },
  };

  getImage(fileName: string) {
    this.fileService.getFile(fileName).subscribe((audioFile: Blob) => {
      const fileURL = URL.createObjectURL(audioFile);
      const regex = /<img[^>]+src="([^">]+)"/g;
      const match = regex.exec(this.question.content);
      if (match) {
        this.question.content = this.question.content.replace(
          match[1],
          fileURL
        );
      }
    });
  }

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
