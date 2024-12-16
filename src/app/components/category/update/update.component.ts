import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importando o HttpClientModule
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
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
    providers: [CategoryService],
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
    formData = {
        nome: ''
    };

    // private registerService = inject(RegisterService);
    private toast = inject(MatSnackBar);
    private categoryService = inject(CategoryService);
    private tokenService = inject(TokenService);
    private activateRouting = inject(ActivatedRoute);
    private router = inject(Router);

    private id: any;
    category: Category = new Category();

    ngOnInit(): void {
        this.id = this.activateRouting.snapshot.paramMap.get('id');
        console.log(this.id);
        
        this.get();
    }

    get() {
        this.categoryService.findById(this.category.id).then(
            (response) => {
                this.category = new Category(
                    response.id,
                    response.nome
                );
                console.log(this.category);
                
            },
            (error) => {
                console.log(error);
                
            }
        );
    }

    onSubmit() {
        this.categoryService.update(this.id, this.category).then(
            (response) => {
                this.toast.open('Conta editada com sucesso!', 'Fechar', {
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
