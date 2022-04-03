import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Token Service

import { TokenStorageService } from '../../_services/token-storage.service';

// Services

import { MembersService } from '../../_services/members.service';
import { TableService } from '../../shared/services/table.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

interface DataItem {
    name: string;
    city: string;
    address: string;
    address_2: string;
    county: string;
    email: string;
    fax: string;
    id: number;
    phone: string;
    postcode: string;
    short_info: string;
    status: number;
    astatus: string;
    webaddress: string;
}


@Component({
    templateUrl: './memberslist.component.html'
})


export class MembersListingComponent {

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
            title: 'Name',
            compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name)
        },
        {
            title: 'City',
            compare: (a: DataItem, b: DataItem) => a.city.localeCompare(b.city)
        },
        {
            title: 'Email',
            compare: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
        },
        {
            title: 'Postcode',
            compare: (a: DataItem, b: DataItem) => a.postcode.localeCompare(b.postcode),
        },
        {
            title: 'Status',
            compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name)
        },
        {
            title: 'Action'
        }
    ]
    constructor(private tableSvc: TableService, private tokenStorage: TokenStorageService, private membersService: MembersService, private route: Router, private message: NzMessageService, private modal: NzModalService) {
        // this.displayData = this.productsList
    }

    listOfDisplayData = [...this.displayData];

    ngOnInit(): void {
        this.getMembersList();
    }

    getMembersList(): void {

        this.membersService.getMembers().subscribe(
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
    addNewMember(): void {
        this.route.navigate(['/member/add']);
    }

    deleteMember(id): void {
        // console.log('Delete Function' + id);

        if (id > 0) {

            this.modal.confirm({
                nzTitle: 'Are you sure delete this?',
                nzContent: '',
                nzOkText: 'Yes',
                nzOnOk: () => {

                    this.membersService.deleteMemberRecord(id).subscribe(
                        data => {
                            // console.log('data 1231 === ' + data.success);
                            // this.tokenStorage.saveToken(data.token);
                            this.tokenStorage.saveRefreshToken(data.refreshToken);

                            if (data.success > 0) {
                                this.displayData = data.data;
                                this.listOfDisplayData = [...this.displayData];
                            }
                            else if (data.message == 'Invalid Token') {
                                this.errorMessage = 'Invalid Token found';
                                this.route.navigate(['/authentication/login']);
                            }
                        },
                        err => {
                            // console.log('data 123 === ' + err.error.message);
                            this.errorMessage = err.error.message;
                            this.route.navigate(['/authentication/login']);
                        }
                    );

                },
                nzCancelText: 'No',
                nzOnCancel: () => console.log('Cancel')
            });
        }

    }

    /* deleteFunc(id): void {    
    } */

    search(): void {
        const data = this.listOfDisplayData
        this.displayData = this.tableSvc.search(this.searchInput, data)
    }

    /* categoryChange(value: string): void {
        const data = this.productsList
        value !== 'All' ? this.displayData = data.filter(elm => elm.category === value) : this.displayData = data
    }

    statusChange(value: string): void {
        const data = this.productsList
        value !== 'All' ? this.displayData = data.filter(elm => elm.status === value) : this.displayData = data
    } */
}    