import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private httpClient: HttpClient) {}

  getFile(fileName: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/file/${fileName}`, {
      responseType: 'blob' as 'json',
    });
  }

  uploadAudioFile(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.httpClient.post<any>('http://localhost:3000/upload', formData);
  }

  deleteFile(fileName: string): Observable<any> {
    return this.httpClient.delete<any>(
      `http://localhost:3000/file/${fileName}`,
      { responseType: 'json' }
    );
  }
}
