import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { PoButtonModule,
    PoModalModule,PoTableModule,
    PoDynamicModule,
    PoLoadingModule,
    PoInfoModule,
    PoWidgetModule,
    PoAccordionModule,
    PoGaugeModule,
    PoContainerModule,
    PoChartModule, 
} from '@po-ui/ng-components';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';


@NgModule({
    declarations: [HomeComponent],
    imports: [PoButtonModule, 
        PoModalModule,
        PoTableModule,
        PoDynamicModule,
        PoLoadingModule,
        PoInfoModule,
        PoCodeEditorModule,
        PoWidgetModule,
        PoAccordionModule,
        PoGaugeModule,
        PoContainerModule,
        PoChartModule],
    // exports: [ManagementComponent], // Se você precisar exportar o componente
  })
  export class HomeModule {}