import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdateComponent } from './components/user/update/update.component';
import { AllComponent } from './components/user/all/all.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "user/:email",
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "user/edit/:email",
        component: UpdateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "user",
        component: AllComponent,
        canActivate: [AuthGuard]
    },

];
