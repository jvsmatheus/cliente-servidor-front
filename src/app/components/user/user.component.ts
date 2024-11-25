import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
    selector: 'app-user',
    imports: [],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
    private userService = inject(UserService);
    private activateRouting = inject(ActivatedRoute);
    private email: any;
    private user: User | null = null;

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
                console.log(this.user);
                
            },
            (error) => {
                console.log(error);
                
            }
        );
    }
}
