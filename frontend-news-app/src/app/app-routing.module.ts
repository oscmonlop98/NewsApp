import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivedNewsComponent } from './archived-news/archived-news.component';
import { HomeNewsComponent } from './home-news/home-news.component';

const routes: Routes = [
  { path: '', component: HomeNewsComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: 'home' , pathMatch: 'full' },
  { path: 'home', component: HomeNewsComponent },
  { path: 'archived', redirectTo: 'archived', pathMatch: 'full' },
  { path: 'archived', component: ArchivedNewsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
