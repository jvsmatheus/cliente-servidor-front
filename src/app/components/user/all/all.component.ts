import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all',
  imports: [CommonModule],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent implements OnInit{

    private userService = inject(UserService);

    users: User[] = [];

    ngOnInit(): void {
        this.get();
    }

    get() {
        this.userService.findAll().then(
            (response) => {
                for(let user of response) {
                    this.users.push(new User(
                        user.nome,
                        user.email,
                        user.senha,
                        user.isAdmin
                    ));
                }
                console.log("users", this.users);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
