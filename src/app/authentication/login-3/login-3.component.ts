import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';

import { Router } from '@angular/router';


@Component({
    templateUrl: './login-3.component.html'
})

export class Login3Component {
    loginForm: FormGroup;

    /* form: any = {
        username: null,
        password: null
    };  */

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    // roles: string[] = [];

    constructor(private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private route: Router) { }

    submitForm(): void {

        const { username, password } = this.loginForm.value;

        // const username = this.loginForm.username;
        // const password = this.loginForm.password;

        for (const i in this.loginForm.controls) {
            this.loginForm.controls[i].markAsDirty();
            this.loginForm.controls[i].updateValueAndValidity();
        }

        this.authService.login(username, password).subscribe(
            data => {
                // console.log('data 23 === ' + data);
                this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveRefreshToken(data.refreshToken);
                // this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                // this.roles = this.tokenStorage.getUser().roles;
                this.route.navigate(['/dashboard']);
                // this.reloadPage();
            },
            err => {
                // console.log('err 33 === ' + err);
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    reloadPage(): void {
        window.location.reload();
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });

        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            // this.roles = this.tokenStorage.getUser().roles;
        }
    }
}    