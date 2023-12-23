import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule,PoPageModule  } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { PoTemplatesModule } from '@po-ui/ng-templates';

import { HomeComponent } from './path/to/home/home.component'; // Importe seus componentes
import { ManagementComponent } from './path/to/management/management.component';
import { ManagementModule } from './path/to/management/management.module';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota padrão
  { path: 'home', component: HomeComponent },
  { path: 'manager', component: ManagementComponent },
  { path: 'management', component: ManagementComponent },
  // Adicione mais rotas conforme necessário
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)],
    PoCodeEditorModule,
    PoTemplatesModule,
    PoPageModule,
    ManagementModule
  ],
  exports: [RouterModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
