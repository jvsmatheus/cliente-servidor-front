import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { WarningService } from '../../services/warning.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { Warning } from '../../models/warning';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-user',
    imports: [
        RouterModule,
        CommonModule,
        MatSidenavModule,
        MatPseudoCheckboxModule, 
        FormsModule, 
        MatButtonModule
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
    private userService = inject(UserService);
    private loginService = inject(LoginService);
    private categoryService = inject(CategoryService);
    private activateRouting = inject(ActivatedRoute);
    private router = inject(Router);
    private toast = inject(MatSnackBar);

    private email: any;
    events: string[] = [];
    opened: boolean = false;
    
    user: User = new User();
    categories: Category[] = [];

    ngOnInit(): void {
        this.email = this.activateRouting.snapshot.paramMap.get('email');
        this.get();
        
    }

    get() {
        this.userService.findByEmail(this.email).then(
            (response) => {
                this.user = new User(
                    response.nome,
                    response.email,
                    response.senha,
                    response.admin,
                );
                localStorage.setItem("current-user", JSON.stringify(this.user))
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );

        this.categoryService.findAll().then(
            (response) => {
                for (let category of response) {
                    this.categories.push(category);
                }
            }
        );
    }

    delete(email: string) {
        this.userService.delete(email).then(
            (response) => {
                this.toast.open('Usuário deletado com sucesso', 'Fechar', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-danger'],
                });
                setInterval(() => {
                    this.router.navigate(['/'])
                }, 2000);
            },
            (error) => {
                console.log(error);
                
            }
        )
    }

    logout() {
        this.loginService.logout();
        
    }

    debug() {
        console.log(this.user);
    }
}
