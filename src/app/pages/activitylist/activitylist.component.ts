import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Token Service

import { TokenStorageService } from '../../_services/token-storage.service';

// Services

import { ActivityService } from '../../_services/activity.service';
import { TableService } from '../../shared/services/table.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

interface DataItem {
    title: string;
    category: string;
    id: number;
    status: number;
    astatus: string;
}


@Component({
    templateUrl: './activitylist.component.html'
})


export class ActivityListingComponent {

    errorMessage = '';
    searchValue = '';
    visible = false;

    selectedCategory: string;
    selectedStatus: string;
    searchInput: any;
    displayData = [];

    orderColumn = [
        {
            title: 'ID',
            compare: (a: DataItem, b: DataItem) => a.id - b.id,
        },
        {
            title: 'Title',
            compare: (a: DataItem, b: DataItem) => a.title.localeCompare(b.title)
        },
        {
            title: 'Category',
            compare: (a: DataItem, b: DataItem) => a.category.localeCompare(b.category)
        },
        {
            title: 'Status',
            compare: (a: DataItem, b: DataItem) => a.astatus.localeCompare(b.astatus)
        },
        {
            title: 'Action'
        }
    ]
    constructor(private tableSvc: TableService, private tokenStorage: TokenStorageService, private activityService: ActivityService, private route: Router, private message: NzMessageService, private modal: NzModalService) {
        // this.displayData = this.productsList
    }

    listOfDisplayData = [...this.displayData];

    ngOnInit(): void {
        this.getActivityList();
    }

    getActivityList(): void {

        this.activityService.getActivities().subscribe(
            data => {
                // console.log('data 1231 === ' + data.success);
                // this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveRefreshToken(data.refreshToken);

                if (data.success > 0) {
                    this.displayData = data.data;
                    this.listOfDisplayData = [...this.displayData];

                    // this.message.create('success', `Members Listings`);
                }
                else if (data.message == 'Invalid Token') {
                    this.errorMessage = 'Invalid Token found';
                    this.message.create('error', `Session Expired`);
                    this.route.navigate(['/authentication/login']);
                }
                else {
                    this.message.create('error', `Record Not Exist`);
                }
            },
            err => {
                // console.log('data 123 === ' + err.error.message);
                this.errorMessage = err.error.message;
                this.route.navigate(['/authentication/login']);
            }
        );
    }

    reset(): void {
        this.searchValue = '';
        this.search();
    }
    addNewActivity(): void {
        this.route.navigate(['/registered-activity/add']);
    }

    search(): void {
        const data = this.listOfDisplayData
        this.displayData = this.tableSvc.search(this.searchInput, data)
    }
}    