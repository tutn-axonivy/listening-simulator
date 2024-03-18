import { Question } from './question.model';

export interface Quiz {
  id: string;
  name: string;
  timeout: number | null;
  questions: Question[];
  audioName: string;
  parts: [];
}
