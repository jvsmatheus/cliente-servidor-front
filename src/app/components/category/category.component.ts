import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importando o HttpClientModule
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { TokenService } from '../../services/token.service';

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
    providers: [CategoryService],
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
    formData = {
        nome: '',
        email: '',
        senha: '',
    };

    // private registerService = inject(RegisterService);
    private toast = inject(MatSnackBar);
    private categoryService = inject(CategoryService);
    private tokenService = inject(TokenService);
    private activateRouting = inject(ActivatedRoute);
    private router = inject(Router);

    category: Category = new Category();

    ngOnInit(): void {
    }

    onSubmit() {
        this.categoryService.create(this.category).then(
            (response) => {
                this.toast.open('Conta criada com sucesso!', 'Fechar', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-success']
                });

                setInterval(() => {
                    this.router.navigate(['/category/all'])
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
