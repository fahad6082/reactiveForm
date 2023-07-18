import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListEmployeesComponent
  },
  {
    path: 'create',
    component: CreateEmployeeComponent
  },
  {
    path: 'login',
    component: LogInComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
