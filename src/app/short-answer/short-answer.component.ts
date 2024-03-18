import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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
    MatIconModule,
    MatCardModule,
  ],
  providers: [FileService],
  templateUrl: './short-answer.component.html',
  styleUrl: './short-answer.component.css',
})
export class ShortAnswerComponent implements OnInit {
  @Input() question: any;
  @Input() isEditting: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() isTesting: boolean = false;

  questionTitle: string = '';

  constructor(private fileService: FileService) {}
  ngOnInit(): void {
    if (this.question.imageName) {
      this.getImage(this.question.imageName);
    }
  }

  config: AngularEditorConfig = {
    editable: true,
    rawPaste: true,
    uploadUrl: 'http://localhost:3000/file',
    upload: (file) => {
      return this.fileService.uploadAudioFile(file).pipe(
        map((response) => {
          const imageName = response.fileName;
          this.question.imageName = imageName;
          this.getImage(imageName);
          console.log(this.question.content);
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
    this.question.choices.push({ index: '', content: '' });
  }

  removeChoice(index: number) {
    this.question.choices.splice(index, 1);
  }
}
