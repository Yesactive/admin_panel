import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Token Service

import { TokenStorageService } from '../../_services/token-storage.service';

// Services

import { CompanyService } from '../../_services/company.service';
import { TableService } from '../../shared/services/table.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

interface DataItem {
    title: string;
    city: string;
    address: string;
    address_2: string;
    county: string;
    email: string;
    fax: string;
    id: number;
    phone: string;
    postcode: string;
    description: string;
    status: number;
    astatus: string;
    webaddress: string;
}


@Component({
    templateUrl: './companies_list.component.html'
})


export class CompaniesListingComponent {

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
            compare: (a: DataItem, b: DataItem) => a.astatus.localeCompare(b.astatus)
        },
        {
            title: 'Action'
        }
    ]
    constructor(private tableSvc: TableService, private tokenStorage: TokenStorageService, private companyService: CompanyService, private route: Router, private message: NzMessageService, private modal: NzModalService) {
        // this.displayData = this.productsList
    }

    listOfDisplayData = [...this.displayData];

    ngOnInit(): void {
        this.getCompaniesList();
    }

    getCompaniesList(): void {

        this.companyService.getCompanies().subscribe(
            data => {
                // console.log('data 1231 === ' + data.success);
                // this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveRefreshToken(data.refreshToken);

                if (data.success > 0) {
                    this.displayData = data.data;
                    this.listOfDisplayData = [...this.displayData];

                    // this.message.create('success', `Company Listings`);
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
                // console.log('data error 123 === ' + err.error.message);
                // this.errorMessage = err.error.message;
                this.message.create('error', `Record Not Exist`);
                this.route.navigate(['/authentication/login']);
            }
        );
    }

    reset(): void {
        this.searchValue = '';
        this.search();
    }
    addNewCompany(): void {
        this.route.navigate(['/activity_provider/add']);
    }

    deleteCompany(id): void {
        // console.log('Delete Function' + id);

        if (id > 0) {

            this.modal.confirm({
                nzTitle: 'Are you sure delete this?',
                nzContent: '',
                nzOkText: 'Yes',
                nzOnOk: () => {

                    this.companyService.deleteCompanyRecord(id).subscribe(
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
    search(): void {
        const data = this.listOfDisplayData
        this.displayData = this.tableSvc.search(this.searchInput, data)
    }

    /* createMessage(type: string): void {
        this.message.create(type, `This is a message of ${type}`);
    } */

    /* categoryChange(value: string): void {
        const data = this.productsList
        value !== 'All' ? this.displayData = data.filter(elm => elm.category === value) : this.displayData = data
    }

    statusChange(value: string): void {
        const data = this.productsList
        value !== 'All' ? this.displayData = data.filter(elm => elm.status === value) : this.displayData = data
    } */
}    