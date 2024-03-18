import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';
import { ReadingComponent } from './reading/reading.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-quiz', component: QuizzesComponent },
  { path: 'edit-quiz/:quizId', component: QuizzesComponent },
  { path: 'test/:quizId', component: TestComponent },
  { path: 'add-reading', component: ReadingComponent },
  { path: 'edit-reading/:quizId', component: ReadingComponent },
  { path: 'reading/:quizId', component: ReadingComponent },
  { path: 'results/:resultId', component: ResultComponent },
];
