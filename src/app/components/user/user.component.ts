import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user',
    imports: [
        RouterModule,
        CommonModule
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
    private userService = inject(UserService);
    private loginService = inject(LoginService);
    private activateRouting = inject(ActivatedRoute);
    private router = inject(Router);
    private toast = inject(MatSnackBar);

    private email: any;
    
    user: User = new User();

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
                    response.isAdmin,
                );
            },
            (error) => {
                console.log(error);
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
