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
    if (this.question.imageUrl) {
      this.getImage(this.question.imageUrl);
    }
  }

  config: AngularEditorConfig = {
    editable: true,
    uploadUrl: 'http://localhost:3000/file',
    upload: (file) => {
      return this.fileService.uploadAudioFile(file).pipe(
        map((response) => {
          const imageUrl = response.fileName;
          this.question.imageUrl = imageUrl;
          return {
            ...response,
            body: { imageUrl },
          } as HttpResponse<UploadResponse>;
        })
      );
    },
  };

  getImage(fileName: string) {
    this.fileService.getFile(fileName).subscribe((audioFile: Blob) => {
      const fileURL = URL.createObjectURL(audioFile);
      this.question.title = this.question.title.replace(
        this.question.imageUrl,
        fileURL
      );

      console.log(this.question.title);
    });
  }

  addChoice() {
    this.question.choices.push({ index: '', content: '' });
  }

  removeChoice(index: number) {
    this.question.choices.splice(index, 1);
  }
}
