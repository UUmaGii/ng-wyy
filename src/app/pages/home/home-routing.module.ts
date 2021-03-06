import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolverService } from './home-resolve.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent, resolve: { homeDatas: HomeResolverService }},
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ HomeResolverService ]
})
export class HomeRoutingModule { }
