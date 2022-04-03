import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivityService } from '../../_services/activity.service';
import { CategoryService } from '../../_services/category.service';
import { TokenStorageService } from '../../_services/token-storage.service';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.css']
})

export class ActivityComponent {

    activityForm: FormGroup;

    searchValue = '';
    visible = false;
    activity_id: any = 0;
    isEdit = false;
    memStatus: number = 0;

    isLoadingOne = false;
    editMode = false;
    isSpinning = false;


    statusOptionList = [
        { label: 'Active', value: '1' },
        { label: 'Inactive', value: '0' }
    ];

    categoryList = [];

    defaultSelValue = {};//this.statusOptionList[0]; //{ label: 'Active', value: '1' };
    defaultCategoryValue = {};

    errorMessage: string = '';

    constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private tokenStorage: TokenStorageService, private activityService: ActivityService, private categoryService: CategoryService, private route: Router, private message: NzMessageService) {

        this.activity_id = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {

        this.activityForm = this.fb.group({
            title: [null, [Validators.required]],
            category: [null, [Validators.required]],
            status: [this.statusOptionList[0], [Validators.required]],
        });

        if (this.activity_id > 0) {
            this.getActivityRecord(this.activity_id);
            this.editMode = true;
        }
        else {
            this.getCategoryList();
            this.editMode = false;
            // this.defaultSelValue = this.statusOptionList[0];
        }
    }

    getActivityRecord(id): void {

        this.activityService.getActivityRecord(id).subscribe(

            data => {
                // const data2 = JSON.stringify(data.data);
                // console.log('data 25 === ' + JSON.stringify(data));
                this.tokenStorage.saveRefreshToken(data.refreshToken);

                if (data.success > 0) {

                    if (data && data.data && data.data[0].id) {

                        let activityStatus = data.data[0].status;
                        let activityCategory_id = data.data[0].category_id;
                        let activityTitle = data.data[0].title;

                        let activityFormData = this.fb.group(data.data[0]);

                        this.categoryList = data.categories;

                        let setCategory = [];

                        if (activityStatus == 1) {

                            this.defaultSelValue = this.statusOptionList[0];
                            this.memStatus = 1;
                        }
                        else {
                            this.defaultSelValue = this.statusOptionList[1];
                        }

                        // console.log(activityCategory_id);
                        // console.log(this.categoryList);


                        // this.defaultCategoryValue = activityCategory_id;
                        // this.defaultCategoryValue = this.categoryList.find(cat => cat.id === activityCategory_id);


                        if (activityCategory_id > 0 && this.categoryList) {

                            for (let i = 0; i < this.categoryList.length; i++) {

                                // this.activityForm.value.category = (this.categoryList[i].id == activityCategory_id) ? this.categoryList[i] : '';

                                if (this.categoryList[i].id == activityCategory_id) {
                                    // this.activityForm.value.category = this.categoryList[i];
                                    setCategory = this.categoryList[i];
                                }
                            }

                            this.activityForm.patchValue({ id: this.activity_id, title: activityTitle, category: setCategory, status: this.defaultSelValue });

                        }
                        else {
                            this.activityForm.patchValue({ id: this.activity_id, title: activityTitle, category: [], status: this.defaultSelValue });

                        }
                    }
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

    getCategoryList(): void {

        this.categoryService.getCategories().subscribe(
            data => {

                if (data.success > 0) {
                    this.categoryList = data.data;
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

    onBack(): void {
        console.log('onBack');
    }

    submitForm(): void {

        // console.log(this.activityForm.value);
        // console.log(this.defaultCategoryValue);
        this.isLoadingOne = true;

        for (const i in this.activityForm.controls) {
            this.activityForm.controls[i].markAsDirty();
            this.activityForm.controls[i].updateValueAndValidity();
        }

        if (this.activityForm && this.activityForm.status && this.activityForm.status == 'VALID') {

            if (this.editMode == true) {

                this.activityForm.value.id = this.activity_id;

                
                this.activityService.updateActivityRecord(this.activityForm.value).subscribe(
                    data => {
                        // console.log(data);
                        this.isLoadingOne = false;
                        this.tokenStorage.saveRefreshToken(data.refreshToken);

                        if (data.success > 0) {
                            this.route.navigate(['/registered-activity']);
                        }
                    },
                    err => {
                        this.isLoadingOne = false;
                        this.errorMessage = err.error.message;
                    }
                );

            }
            else {
                this.activityService.addNewActivityRecord(this.activityForm.value).subscribe(
                    data => {
                        // console.log(data);
                        this.isLoadingOne = false;
                        this.tokenStorage.saveRefreshToken(data.refreshToken);

                        if (data.success > 0) {
                            this.route.navigate(['/registered-activity']);
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
        this.route.navigate(['/registered-activity']);
    }

    log(value: { label: string; value: string }): void {
        console.log(value);
    }
}    