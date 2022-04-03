import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';


/* const Companies_ROUTES = [
    { 'path': '', 'loadChildren': () => import('./companies.module').then(m => m.CompaniesModule) },
    // { 'path': 'company', 'loadChildren': () => import('./tooltip/index.module').then(m => m.NzDemoTooltipModule) },

]; */

/* const routes: Routes = [
    ...Companies_ROUTES,
]; */


 const routes: Routes = [
    {
        path: '',
        component: CompaniesComponent,
        data: {
            title: 'Companies Dashboard ',
            headerDisplay: "none"
        }
    }
]; 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CompaniesRoutingModule { }
