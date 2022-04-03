import { Routes } from '@angular/router';
// import { ComponentsComponent } from '../../components/components.component'

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'companies',
        loadChildren: () => import('../../companies/companies.module').then(m => m.CompaniesModule),
    },
    /* {
        path: 'members',
        loadChildren: () => import('../../members/members.module').then(m => m.MembersModule),
    }, */
    //Component
    /*  {
         path: 'demo',
         component: ComponentsComponent,
         children: [
              {
                 path: '',
                 redirectTo: '/components/affix',
                 pathMatch: 'full'
             }, 
             {
                 path: '',
                 loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
             }
         ],
         data: {
             title: 'Components '
         }
     }, */
    //Pages
    {
        path: '',
        data: {
            title: 'Pages '
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
            },
            // { path: '404', loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule) },
            // { path: '**', redirectTo: '404' }
        ]
    },
    // { path: '404', loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule) },
    // { path: '**', redirectTo: '404' }
    // { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];