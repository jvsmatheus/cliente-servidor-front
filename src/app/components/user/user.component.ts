import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';

@Component({
    selector: 'app-user',
    imports: [
        RouterModule
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
    private userService = inject(UserService);
    private activateRouting = inject(ActivatedRoute);
    private router = inject(Router);
    private email: any;
    
    user: User = new User();

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
            },
            (error) => {
                console.log(error);
            }
        );
    }

    delete(email: string) {
        this.userService.delete(this.email).then(
            (response) => {
                setInterval(() => {
                    this.router.navigate(['/'])
                }, 2000);
            },
            (error) => {
                console.log(error);
                
            }
        )
    }
}