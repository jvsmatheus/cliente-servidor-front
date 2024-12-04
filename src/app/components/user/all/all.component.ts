import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-all',
    imports: [CommonModule],
    templateUrl: './all.component.html',
    styleUrl: './all.component.css',
})
export class AllComponent implements OnInit {
    private userService = inject(UserService);
    private toast = inject(MatSnackBar);

    users: User[] = [];

    ngOnInit(): void {
        this.get();
    }

    get() {
        this.users = [];
        this.userService.findAll().then(
            (response) => {
                for (let user of response) {
                    this.users.push(
                        new User(
                            user.nome,
                            user.email,
                            user.senha,
                            user.isAdmin
                        )
                    );
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    // edit(user: User) {
    //     this.userService.update(user.email, user).then(
    //         (response) => {
    //             this.toast.open('Usuário alterado com sucesso', 'Fechar', {
    //                 duration: 1500,
    //                 horizontalPosition: 'right',
    //                 verticalPosition: 'top',
    //                 panelClass: ['custom-snackbar-success'],
    //             });
    //             this.get();
    //         },
    //         (error) => {
    //             this.toast.open(error.error.mensagem, 'Fechar', {
    //                 duration: 2000,
    //                 horizontalPosition: 'right',
    //                 verticalPosition: 'top',
    //                 panelClass: ['custom-snackbar-danger'],
    //             });
    //         }
    //     );
    // }

    remove(email: string) {
        this.userService.delete(email).then(
            (response) => {
                this.toast.open('Usuário deletado com sucesso', 'Fechar', {
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
