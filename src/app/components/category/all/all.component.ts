import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Category } from '../../../models/category';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import { User } from '../../../models/user';
import { TokenService } from '../../../services/token.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-all',
    imports: [CommonModule, RouterModule],
    templateUrl: './all.component.html',
    styleUrl: './all.component.css',
})
export class AllComponent implements OnInit {
    private categoryService = inject(CategoryService);
    private tokenService = inject(TokenService);
    private toast = inject(MatSnackBar);

    categories: Category[] = [];
    user: User = new User();

    ngOnInit(): void {
        this.get();

        let user = localStorage.getItem("current-user")

        if (user != null) {
            this.user = JSON.parse(user)
        }
        console.log(this.user);
        
    }


    get() {
        this.categories = [];
        this.categoryService.findAll().then(
            (response) => {
                for (let user of response) {
                    this.categories.push(
                        new Category(
                            user.id,
                            user.nome
                        )
                    );
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

   
    remove(id: number) {
        console.log(id);
        
        this.categoryService.delete(id).then(
            (response) => {
                this.toast.open('Categoria deletado com sucesso', 'Fechar', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-success'],
                });
                this.get();
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
