import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableService } from '../shared/services/table.service';

// import { NzModalService } from 'ng-zorro-antd/modal';

import { PagesRoutingModule } from './pages-routing.module';

import { NzCardModule } from 'ng-zorro-antd/card';
// import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
// import { NzRadioModule } from 'ng-zorro-antd/radio';
// import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
// import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
// import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { ProfileComponent } from './profile/profile.component';
/*
import { InvoiceComponent } from './invoice/invoice.component';
import { MembersComponent } from './members/members.component';
import { PricingComponent } from './pricing/pricing.component';

import { BlogGridComponent } from './blog/blog-grid/blog-grid.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';  */

// import { SettingComponent } from './setting/setting.component';
import { MembersListingComponent } from './memberslist/memberslist.component';
import { MemberComponent } from './member/member.component';

import { CompaniesListingComponent } from './companies_list/companies_list.component';
import { CompanyComponent } from './company/company.component';

import { CategoryListingComponent } from './categorylist/categorylist.component';
import { CategoryComponent } from './category/category.component';

import { ActivityListingComponent } from './activitylist/activitylist.component';
import { ActivityComponent } from './activity/activity.component';

const antdModule = [
    NzCardModule,
    // NzSkeletonModule,
    NzAvatarModule,
    NzPaginationModule,
    NzDividerModule,
    NzButtonModule,
    NzListModule,
    NzTableModule,
    // NzRadioModule,
    // NzRateModule,
    NzTabsModule,
    // NzTagModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    // NzSwitchModule,
    NzUploadModule,
    NzToolTipModule,
    NzModalModule,
    NzMessageModule,
    NzInputModule,
    NzSpinModule,
    NzBadgeModule,
    NzDropDownModule,
    NzPageHeaderModule
]

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        /* FormBuilder,
        FormControl,
        FormGroup,
        Validators, */
        ...antdModule
    ],
    declarations: [
        MembersListingComponent,
        MemberComponent,

        CompaniesListingComponent,
        CompanyComponent,

        CategoryListingComponent,
        CategoryComponent,

        ActivityListingComponent,
        ActivityComponent,

        ProfileComponent,
        /* InvoiceComponent,
        MembersComponent,
        PricingComponent,
        BlogGridComponent,
        BlogListComponent,
        BlogPostComponent */
    ],
    providers: [
        TableService,
        // NzModalService
    ]
})

export class PagesModule { }