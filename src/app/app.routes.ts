import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-quiz', component: QuizzesComponent },
  { path: 'test/:quizId', component: TestComponent },
  { path: 'results/:resultId', component: ResultComponent },
];
