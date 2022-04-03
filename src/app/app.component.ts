import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    private roles: string[] = [];
    isLoggedIn = false;
    // showAdminBoard = false;
    // showModeratorBoard = false;
    username?: string;

    constructor(private tokenStorageService: TokenStorageService, private route: Router) { }

    ngOnInit(): void {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();

            // console.log('user =>' + JSON.stringify(user));
            // this.roles = user.roles;

            // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

            this.username = user.username;
        }
        else {
            this.route.navigate(['/authentication/login']);
        }
    }

    /* logout(): void {
        this.tokenStorageService.signOut();
        window.location.reload();
    } */
}
/* export class AppComponent {

} */
