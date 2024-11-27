import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importando o HttpClientModule
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

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
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    formData = {
        nome: '',
        email: '',
        senha: '',
    };

    // private registerService = inject(RegisterService);
    private toast = inject(MatSnackBar);
    private userService = inject(UserService);
    private router = inject(Router);

    onSubmit() {
        this.userService.create(this.formData).then(
            (response) => {
                this.toast.open('Conta criada com sucesso!', 'Fechar', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-success']
                });

                if (!localStorage.getItem(this.userService.api_token_name)) {
                    setInterval(() => {
                        this.router.navigate(['/']);
                    }, 2000);
                }
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
