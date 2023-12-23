// management.module.ts
import { NgModule } from '@angular/core';
import { ManagementComponent } from './management.component';
import { PoButtonModule, PoModalModule,PoTableModule,PoDynamicModule,PoLoadingModule,PoInfoModule,PoWidgetModule,PoAccordionModule } from '@po-ui/ng-components';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';



@NgModule({
  declarations: [ManagementComponent],
  imports: [PoButtonModule, PoModalModule,PoTableModule,PoDynamicModule,PoLoadingModule,PoInfoModule,PoCodeEditorModule,PoWidgetModule ,PoAccordionModule  ],
  // exports: [ManagementComponent], // Se você precisar exportar o componente
})
export class ManagementModule {}
