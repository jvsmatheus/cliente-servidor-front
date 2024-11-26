import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importando o HttpClientModule
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { TokenService } from '../../../services/token.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule,
        RouterModule,
    ],
    providers: [UserService],
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
    formData = {
        nome: '',
        email: '',
        senha: '',
    };

    // private registerService = inject(RegisterService);
    private toast = inject(MatSnackBar);
    private userService = inject(UserService);
    private tokenService = inject(TokenService);
    private activateRouting = inject(ActivatedRoute);
    private router = inject(Router);

    private email: any;
     senha: any;
    
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
                    response.is_admin,
                );
                
            },
            (error) => {
                console.log(error);
                
            }
        );
    }

    onSubmit() {
        this.user.senha = this.senha;
        this.userService.update(this.email, this.user).then(
            (response) => {
                this.toast.open('Conta editada com sucesso!', 'Fechar', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-success']
                });

                setInterval(() => {
                    this.router.navigate(['/user/' + this.email])
                }, 1000)
            },
            (error) => {
                this.toast.open(error.error.mensagem, 'Fechar', {
                    duration: 2000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-danger']
                });
            }
        );
    }
}
