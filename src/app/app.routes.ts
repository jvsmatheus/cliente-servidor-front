import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserComponent } from './components/user/update/update.component';
import { UpdateCategoryComponent } from './components/category/update/update.component';
import { AllComponent } from './components/category/all/all.component';
import { CategoryComponent } from './components/category/category.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "register",
        component: RegisterComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "user/:email",
        component: UserComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "user/edit/:email",
        component: UpdateUserComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "user",
        component: AllComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "category",
        component: CategoryComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "category/all",
        component: AllComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "category/edit/:id",
        component: UpdateCategoryComponent,
        // canActivate: [AuthGuard]
    },

];
