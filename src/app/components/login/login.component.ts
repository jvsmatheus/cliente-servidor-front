import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importando o HttpClientModule
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule,
        RouterModule,
    ],
    providers: [LoginService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    formData = {
        email: '',
        senha: '',
    };

    private loginService = inject(LoginService);
    private tokenService = inject(TokenService);
    private toast = inject(MatSnackBar);
    private router = inject(Router);

    private token: any;
    private email: any;

    ngOnInit(): void {
        this.token = localStorage.getItem(this.loginService.api_token_name);

        if (this.token) {
            this.email = this.tokenService.getClaim(this.token, 'email');
            console.log(this.email);
        }

        
    }

    onSubmit() {
        this.loginService.login(this.formData).then(
            (response) => {
                if (response.token) {
                    this.loginService.setApiToken(response.token);
                    this.toast.open('Logando...', 'Fechar', {
                        duration: 1500,
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: ['custom-snackbar-success'],
                    });
                    setInterval(() => {
                        this.router.navigate(['/user/' + this.email]);
                    }, 2000);
                }
            },
            (error) => {
                this.toast.open(error.error.mensagem, 'Fechar', {
                    duration: 2000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-danger'],
                });
            }
        );
    }
}
