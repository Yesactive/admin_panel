import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CompaniesRoutingModule } from "./companies-routing.module";
import { CompaniesComponent } from './companies.component';

// import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

/** Import any ng-zorro components as the module required except icon module */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
// import { NzFormModule } from 'ng-zorro-antd/form';
// import { NzRadioModule } from 'ng-zorro-antd/radio';
// import { NzBadgeModule } from 'ng-zorro-antd/badge';
// import { NzInputModule } from 'ng-zorro-antd/input';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

/** Assign all ng-zorro modules to this array*/
const antdModule = [
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    NzSwitchModule,
    // NzBreadCrumbModule,
    NzPageHeaderModule,
]

@NgModule({
    imports: [
        SharedModule,
        CompaniesRoutingModule,
        ...antdModule
    ],
    exports: [],
    declarations: [
        CompaniesComponent
    ]
})
export class CompaniesModule { }
