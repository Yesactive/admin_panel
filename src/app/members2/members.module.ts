import { NgModule } from '@angular/core';
// import { SharedModule } from '../shared/shared.module';


import { MembersRoutingModule } from "./members-routing.module";
import { MembersComponent } from './members.component';


import { IconDefinition } from '@ant-design/icons-angular';
import { LeftOutline, RightOutline } from '@ant-design/icons-angular/icons';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';

/** Import any ng-zorro components as the module required except icon module */
// import { NzButtonModule } from 'ng-zorro-antd/button';

/** Assign all ng-zorro modules to this array*/
/* const antdModule = [
    NzButtonModule,
] */

const icons: IconDefinition[] = [LeftOutline, RightOutline];

@NgModule({
    imports: [
        // SharedModule,
        MembersRoutingModule,
        NzIconModule.forRoot(icons),
        NzGridModule,
        NzAffixModule,
        NzMenuModule,
        NzI18nModule,
        NzSelectModule,
        NzMessageModule,
        NzPopoverModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        NzBadgeModule
    ],
    exports: [],
    declarations: [
        MembersComponent
    ]
})
export class MembersModule { }
