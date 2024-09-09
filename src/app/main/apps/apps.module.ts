import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


const routes = [
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
    
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

  ]
})
export class AppsModule { }
