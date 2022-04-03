import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CompanyService } from '../../_services/company.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})

export class CompanyComponent {

    companyForm: FormGroup;

    searchValue = '';
    visible = false;
    company_id: any = 0;
    isEdit = false;
    // memStatus: number = 0;

    isLoadingOne = false;
    editMode = false;
    isSpinning = false;


    statusOptionList = [
        { label: 'Active', value: '1' },
        { label: 'Inactive', value: '0' }
    ];

    defaultSelValue = {};//this.statusOptionList[0];//{ label: 'Active', value: '1' };

    errorMessage: string = '';

    constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private tokenStorage: TokenStorageService, private companyService: CompanyService, private route: Router,private message: NzMessageService ) {

        this.company_id = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {

        this.companyForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            title: [null, [Validators.required]],
            description: [null],
            reg_no: [null],
            address: [null, [Validators.required]],
            address_2: [null],
            city: [null],//, [Validators.required]
            county: [null],
            postcode: [null],
            fax: [null],
            phone: [null],
            webaddress: [null],
            status: [this.statusOptionList[0], [Validators.required]],
        });

        if (this.company_id > 0) {
            this.getCompanyRecord(this.company_id);
            this.editMode = true;
        }
        else {
            this.editMode = false;
            // this.defaultSelValue = this.statusOptionList[0];
        }
    }

    getCompanyRecord(id): void {

        this.companyService.getCompanyRecord(id).subscribe(

            data => {
                
                this.tokenStorage.saveRefreshToken(data.refreshToken);

                if (data.success > 0) {

                    if (data && data.data && data.data.id) {

                        let memberStatus = data.data.status;

                        if (memberStatus == 1) {
                            this.defaultSelValue = this.statusOptionList[0];
                        }
                        else {
                            this.defaultSelValue = this.statusOptionList[1];
                        }
                    }

                    // this.companyForm = this.fb.group(data.data);
                    var companyFormData = data.data;
                    companyFormData.status = this.defaultSelValue;
                    // console.log(companyFormData);

                    this.companyForm.patchValue(companyFormData);
                }
                else if (data.message == 'Invalid Token') {
                    this.errorMessage = 'Invalid Token found';
                    this.route.navigate(['/authentication/login']);
                }
            },
            err => {
                console.log(err);
                this.errorMessage = err.error.message;
            }
        );
    }

    onBack(): void {
        console.log('onBack');
    }

    submitForm(): void {

        // console.log(this.companyForm.value);
        this.isLoadingOne = true;
        this.isSpinning = true;

        for (const i in this.companyForm.controls) {
            this.companyForm.controls[i].markAsDirty();
            this.companyForm.controls[i].updateValueAndValidity();
        }
        // console.log(this.companyForm.status);

        if (this.companyForm && this.companyForm.status && this.companyForm.status == 'VALID') {
            // console.log('VALIDATED');

            if (this.editMode == true) {

                this.companyForm.value.id = this.company_id;

                this.companyService.updateCompanyRecord(this.companyForm.value).subscribe(
                    data => {
                        // console.log(data);
                        this.isLoadingOne = false;
                        this.isSpinning = false;
                        this.tokenStorage.saveRefreshToken(data.refreshToken);

                        if (data.success > 0) {
                            this.route.navigate(['/activity_providers']);
                        }
                    },
                    err => {
                        this.isLoadingOne = false;
                        this.isSpinning = false;
                        this.errorMessage = err.error.message;
                    }
                );

            }
            else {
                this.companyService.addNewCompanyRecord(this.companyForm.value).subscribe(
                    data => {
                        // console.log(data);
                        this.isLoadingOne = false;
                        this.isSpinning = false;
                        this.tokenStorage.saveRefreshToken(data.refreshToken);

                        if (data.success > 0) {
                            this.route.navigate(['/activity_providers']);
                        }
                    },
                    err => {
                        this.isLoadingOne = false;
                        this.isSpinning = false;
                        this.errorMessage = err.error.message;
                    }
                );
            }
        }
        else {
            this.isLoadingOne = false;
            this.isSpinning = false;
            this.message.create('error', `Required Fields are not validated`);

        }
    }

    edit(): void {
        this.isEdit = true;
    }

    cancel(): void {
        this.route.navigate(['/activity_providers']);
    }

    log(value: { label: string; value: string }): void {
        console.log(value);
    }
}


@Component({
    selector: 'nz-basic-info-tab-content',
    templateUrl: './company_info.component.html',
})
export class NzBasicInfoTabContentComponent implements OnInit {

    companyActivityForm: FormGroup;

    // console.log(companyActivityForm);

    searchValue = '';
    visible = false;
    company_id: any = 0;

    constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private tokenStorage: TokenStorageService, private companyService: CompanyService, private route: Router,private message: NzMessageService ) {

        this.company_id = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        console.log(`I will init when tab active`);
    }
}

/* @Component({
    selector: 'nz-demo-tab-content-lazy',
    template: ` lazy `
})
export class NzDemoTabContentLazyComponent implements OnInit {

    isSpinning = false;

    ngOnInit(): void {
        console.log(`I will init when tab active`);
    }

} */

/* @Component({
    selector: 'nz-demo-tab-content-eagerly',
    template: ` eagerly `
})
export class NzDemoTabContentEagerlyComponent implements OnInit {
    ngOnInit(): void {
        console.log(`I will init eagerly`);
    }
} */