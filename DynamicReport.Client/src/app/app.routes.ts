import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormComponent } from './components/form/form.component';
import { CreateformComponent } from './components/form/createform/createform.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search/:searchItem', component: HomeComponent },
    { path: 'tag/:tags', component: HomeComponent },
    { path: 'form/:id', component: FormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'newform', component: CreateformComponent }
];