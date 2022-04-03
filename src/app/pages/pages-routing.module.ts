import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
/* import { InvoiceComponent } from './invoice/invoice.component';
// import { MembersComponent } from './members/members.component';
import { PricingComponent } from './pricing/pricing.component';

import { BlogGridComponent } from './blog/blog-grid/blog-grid.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component'; */

// import { SettingComponent } from './setting/setting.component';
import { MembersListingComponent } from './memberslist/memberslist.component';
import { MemberComponent } from './member/member.component';

import { CompaniesListingComponent } from './companies_list/companies_list.component';
import { CompanyComponent } from './company/company.component';

import { CategoryListingComponent } from './categorylist/categorylist.component';
import { CategoryComponent } from './category/category.component';

import { ActivityListingComponent } from './activitylist/activitylist.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            title: 'Profile'
        }
    },
    {
        path: 'activity_providers',
        component: CompaniesListingComponent,
        data: {
            title: 'Activity Providers',
        }
    },
    {
        path: 'activity_provider/:id',
        component: CompanyComponent,
        data: {
            title: 'Activity Provider'
        }
    },
    {
        path: 'members',
        component: MembersListingComponent,
        data: {
            title: 'Members',
        }
    },
    {
        path: 'member/:id',
        component: MemberComponent,
        data: {
            title: 'Member'
        }
    },
    {
        path: 'category',
        component: CategoryListingComponent,
        data: {
            title: 'Category',
        }
    },
    {
        path: 'category/:id',
        component: CategoryComponent,
        data: {
            title: 'Category'
        }
    },
    {
        path: 'registered-activity',
        component: ActivityListingComponent,
        data: {
            title: 'Registered Activities',
        }
    },
    {
        path: 'registered-activity/:id',
        component: ActivityComponent,
        data: {
            title: 'Registered Activities'
        }
    },
    /* {
        path: '404',
        component: MembersListingComponent,
        data: {
            title: 'Members',
        }
    }, */
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
