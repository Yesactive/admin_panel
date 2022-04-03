import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MembersService } from '../../_services/members.service';
import { TokenStorageService } from '../../_services/token-storage.service';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css']
})

export class MemberComponent {

    memberForm: FormGroup;

    searchValue = '';
    visible = false;
    member_id: any = 0;
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

    constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private tokenStorage: TokenStorageService, private membersService: MembersService, private route: Router, private message: NzMessageService) {

        this.member_id = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {

        this.memberForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            name: [null, [Validators.required]],
            short_info: [null],
            address: [null, [Validators.required]],
            address_2: [null],
            city: [null, [Validators.required]],
            county: [null],
            postcode: [null],
            fax: [null],
            phone: [null],
            webaddress: [null],
            status: [this.statusOptionList[0], [Validators.required]],
        });

        if (this.member_id > 0) {
            this.getMemberRecord(this.member_id);
            this.editMode = true;
        }
        else {
            this.editMode = false;
            // this.defaultSelValue = this.statusOptionList[0];
        }
    }

    getMemberRecord(id): void {

        this.membersService.getMemberRecord(id).subscribe(

            data => {
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

                    // var memberFormData = this.fb.group(data.data);

                    var memberFormData = data.data;
                    memberFormData.status = this.defaultSelValue;
                    // console.log(memberFormData);

                    this.memberForm.patchValue(memberFormData);
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

        // console.log(this.memberForm.value);
        this.isLoadingOne = true;

        for (const i in this.memberForm.controls) {
            this.memberForm.controls[i].markAsDirty();
            this.memberForm.controls[i].updateValueAndValidity();
        }

        if (this.memberForm && this.memberForm.status && this.memberForm.status == 'VALID') {

            if (this.editMode == true) {

                this.memberForm.value.id = this.member_id;

                this.membersService.updateMemberRecord(this.memberForm.value).subscribe(
                    data => {
                        // console.log(data);
                        this.isLoadingOne = false;
                        this.tokenStorage.saveRefreshToken(data.refreshToken);

                        if (data.success > 0) {
                            this.route.navigate(['/members']);
                        }
                    },
                    err => {
                        this.isLoadingOne = false;
                        this.errorMessage = err.error.message;
                    }
                );
            }
            else {
                this.membersService.addNewMemberRecord(this.memberForm.value).subscribe(
                    data => {
                        // console.log(data);
                        this.isLoadingOne = false;
                        this.tokenStorage.saveRefreshToken(data.refreshToken);

                        if (data.success > 0) {
                            this.route.navigate(['/members']);
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
        this.route.navigate(['/members']);
    }

    log(value: { label: string; value: string }): void {
        console.log(value);
    }
}    