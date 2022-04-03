import { Component } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';

import { AuthService } from '../../../_services/auth.service';
import { TokenStorageService } from '../../../_services/token-storage.service';

import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    searchVisible: boolean = false;
    quickViewVisible: boolean = false;
    isFolded: boolean;
    isExpand: boolean;

    constructor(private themeService: ThemeConstantService, private authService: AuthService, private tokenStorage: TokenStorageService,private route:Router) { }

    ngOnInit(): void {
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    }

    toggleFold() {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand() {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    /* searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    } */

    /* quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    } */

    logout(): void {
        this.tokenStorage.signOut();
        // this.route.navigate(['/authentication/login']);
        window.location.reload();
    }
}
