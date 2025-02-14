import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { User } from '../../models/user';
import { Warning } from '../../models/warning';
import { WarningService } from '../../services/warning.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';

@Component({
    selector: 'app-all',
    imports: [CommonModule, RouterModule],
    templateUrl: './warning.component.html',
    styleUrl: './warning.component.css',
})
export class WarningComponent implements OnInit {
    private tokenService = inject(TokenService);
    private warningService = inject(WarningService);
    private categoryService = inject(CategoryService);
    private activateRouting = inject(ActivatedRoute);
    private toast = inject(MatSnackBar);

    warnings: Warning[] = [];
    user: User = new User();
    category: Category = new Category();
    categoryId: number = 0;
    modal: MatDialog = inject(MatDialog);

    ngOnInit(): void {
        this.get();

        let user = localStorage.getItem("current-user")

        if (user != null) {
            this.user = JSON.parse(user)
        }
        console.log(this.user);
        this.categoryId = parseInt(this.activateRouting.snapshot.paramMap.get('idCategoria')!);
    }


    get() {
        this.warnings = [];
        this.categoryService.findById(this.categoryId).then(
            (response) => {
                console.log(response);
                this.category = new Category(response[0].id,  response[0].nome);
                console.log(this.category);
            }
        );
        this.warningService.findAll().subscribe({
            next: (response) => {
                for (let warning of response) {
                    this.warnings.push(warning);
                }
            },
            error: error => console.log(error)
        });
    }

   
    remove(id: number) {
        console.log(id);
        
        this.warningService.delete(id).subscribe({
            next: () => {
                this.toast.open('Categoria deletado com sucesso', 'Fechar', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-success'],
                });
                this.get();
            },
            error: error => {
                this.toast.open(error.error.mensagem, 'Fechar', {
                    duration: 2000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['custom-snackbar-danger'],
                });
            }
        });
    }

    openEditModal(warning: Warning) {
        let modal = this.modal.open(
            CreateComponent,
            {
                width: '60vw',
                data: {
                    warning: warning
                }
            }
        );
          
          modal.componentInstance.formSubmittedEvent.subscribe(() => {
            modal.close();
            this.get();
          });
    }
}
