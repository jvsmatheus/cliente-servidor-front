import { Component, Inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importando o HttpClientModule
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface LoginForm {
    email: FormControl<String|null>;
    senha: FormControl<String|null>; 
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterModule,
        ReactiveFormsModule
    ],
    providers: [LoginService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {

    form: FormGroup<LoginForm>;


    constructor(
        private loginService: LoginService,
        private tokenService: TokenService,
        private router: Router,
        private toast: MatSnackBar,
    ) {
        this.form = new FormGroup<LoginForm>({
            email: new FormControl<string | null>('', [Validators.required, Validators.email]),
            senha: new FormControl<string | null>('', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]),
          });
    }

    private token: any;
    private email: any;

    ngOnInit(): void {
    }

    onSubmit() {
        console.log(this.form.value);
        
        this.loginService.login(this.form.value).subscribe({
            next: (response) => {
                if (response.token) {
                    this.loginService.setApiToken(response.token);
                    this.toast.open('Logando...', 'Fechar', {
                        duration: 1500,
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: ['custom-snackbar-success'],
                    });
                    this.token = localStorage.getItem(this.loginService.api_token_name);

                    if (this.token) {
                        this.email = this.tokenService.getClaim(this.token, 'email');
                        console.log(this.email);

                        setInterval(() => {
                            this.router.navigate(['/user/' + this.email]);
                        }, 2000);
                    }
                    
                }
            },
            error: (error) => {
                this.toast.open(error.error.mensagem, 'Fechar', {
                    duration: 2000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-danger'],
                });
            }
        });
    }
}
