import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CategoryService } from '../../_services/category.service';
import { TokenStorageService } from '../../_services/token-storage.service';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})

export class CategoryComponent {

    categoryForm: FormGroup;

    searchValue = '';
    visible = false;
    category_id: any = 0;
    isEdit = false;
    memStatus: number = 0;

    isLoadingOne = false;
    editMode = false;
    isSpinning = false;


    statusOptionList = [
        { label: 'Active', value: '1' },
        { label: 'Inactive', value: '0' }
    ];

    defaultSelValue = {};//this.statusOptionList[0]; //{ label: 'Active', value: '1' };

    errorMessage: string = '';

    constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private tokenStorage: TokenStorageService, private categoryService: CategoryService, private route: Router, private message: NzMessageService) {

        this.category_id = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {

        this.categoryForm = this.fb.group({
            title: [null, [Validators.required]],
            status: [this.statusOptionList[0], [Validators.required]],
        });

        if (this.category_id > 0) {
            this.getCategoryRecord(this.category_id);
            this.editMode = true;
        }
        else {
            this.editMode = false;
            // this.defaultSelValue = this.statusOptionList[0];
        }
    }

    getCategoryRecord(id): void {

        this.categoryService.getCategoryRecord(id).subscribe(

            data => {
                // const data2 = JSON.stringify(data.data);
                // console.log('data 25 === ' + JSON.stringify(data));
                this.tokenStorage.saveRefreshToken(data.refreshToken);

                if (data.success > 0) {

                    if (data && data.data && data.data.id) {

                        let memberStatus = data.data.status;

                        if (memberStatus == 1) {

                            this.defaultSelValue = this.statusOptionList[0];
                            this.memStatus = 1;
                        }
                        else {
                            this.defaultSelValue = this.statusOptionList[1];
                        }
                    }

                    // this.categoryForm = this.fb.group(data.data);

                    // let categoryStatus = data.data.status;
                    let categoryTitle = data.data.title;


                    this.categoryForm.patchValue({ id: this.category_id, title: categoryTitle,status: this.defaultSelValue });

                    // console.log('data status 2555  === ' + data.data.status);
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

        // console.log(this.categoryForm.value);
        this.isLoadingOne = true;

        for (const i in this.categoryForm.controls) {
            this.categoryForm.controls[i].markAsDirty();
            this.categoryForm.controls[i].updateValueAndValidity();
        }

        if (this.categoryForm && this.categoryForm.status && this.categoryForm.status == 'VALID') {

            if (this.editMode == true) {

                this.categoryForm.value.id = this.category_id;

                this.categoryService.updateCategoryRecord(this.categoryForm.value).subscribe(
                    data => {
                        // console.log(data);
                        this.isLoadingOne = false;
                        this.tokenStorage.saveRefreshToken(data.refreshToken);

                        if (data.success > 0) {
                            this.route.navigate(['/category']);
                        }
                    },
                    err => {
                        this.isLoadingOne = false;
                        this.errorMessage = err.error.message;
                    }
                );

            }
            else {
                this.categoryService.addNewCategoryRecord(this.categoryForm.value).subscribe(
                    data => {
                        // console.log(data);
                        this.isLoadingOne = false;
                        this.tokenStorage.saveRefreshToken(data.refreshToken);

                        if (data.success > 0) {
                            this.route.navigate(['/category']);
                        }
                    },
                    err => {
                        this.isLoadingOne = false;
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
        this.route.navigate(['/category']);
    }

    log(value: { label: string; value: string }): void {
        console.log(value);
    }
}    