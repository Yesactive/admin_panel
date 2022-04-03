import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MembersComponent } from './members.component';


const MEMBERS_ROUTES = [
    { 'path': '', 'loadChildren': () => import('./membersListing/membersListing.module').then(m => m.MembersListingModule) },
    // { 'path': 'company', 'loadChildren': () => import('./tooltip/index.module').then(m => m.NzDemoTooltipModule) },

];

const routes: Routes = [
    ...MEMBERS_ROUTES,
];

/* const routes: Routes = [
    {
        path: '',
        component: MembersComponent,
        data: {
            title: 'Members Dashboard ',
            headerDisplay: "none"
        }
    }
]; */

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MembersRoutingModule { }
