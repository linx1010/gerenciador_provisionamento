import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Adicionado
import { PoDialogService, 
  PoModalComponent, 
  PoTableAction, 
  PoTableColumn, 
  PoNotificationService,
  PoModule, 
  PoFieldModule } from '@po-ui/ng-components';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, PoDialogService]
})
export class AppComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true })
  poModal!: PoModalComponent;
  items: any;
  columns: Array<PoTableColumn> = [];
  detail: any;
  total: number = 0;
  totalExpanded = 0;
  loadingOverlay = false;
  legendTextArea : any;
  formattedJson : any;

  actions: Array<PoTableAction> = [
    {
      action: this.permission.bind(this),
      icon: 'po-icon po-icon-handshake',
      label: 'Provision'
    },
    { action: this.permission.bind(this), icon: 'po-icon po-icon-security-guard', label: 'Resend Permission' },
    { action: this.message.bind(this), icon: 'po-icon po-icon-message', label: 'Messages' },
    { action: this.idSecret.bind(this), icon: 'po-icon po-icon-eye-off', label: 'Id and Secret' },
    { action: this.details.bind(this), icon: 'po-icon-info', label: 'Details' }
  ];

  constructor(
    private serviceApp: AppService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.legendTextArea = 'Overlay'
    this.columns = this.serviceApp.getColumn();
    this.loadingOverlay = true; // Ative o overlay
    this.companysIn(); 
  }

  message(item: any) {
    this.detail = item;
    this.poNotification.warning('Request messages denied!');
  }

  permission(item: any) {
    this.detail = item;
    this.poNotification.success('Send Permission success!');
  }

  // idSecret(item: any) {
  //   this.detail = item;
  //   this.poModal.open();
  // }

  companysIn(): void {
    this.serviceApp.companyInfo().subscribe(
      (data) => {
        // Desative o overlay quando a requisição for concluída
        this.loadingOverlay = false;
        const oldItems: OldJsonItem[] = data;
        this.items = oldItems.map(oldItem => this.transformToNewJsonFormat(oldItem));
        console.log('Dados recebidos:', this.items);
      },
      (error) => {
        this.loadingOverlay = false;
        console.error('Erro ao obter dados:', error);
      }
      );
  }
  idSecret(cnpj:string): void {
    this.serviceApp.completeMessages(cnpj).subscribe(
      (data) => {
        // Desative o overlay quando a requisição for concluída
        this.loadingOverlay = false;
        const OldJsonItem:  = data;
        console.log('Dados recebidos:', this.items);
      },
      (error) => {
        this.loadingOverlay = false;
        console.error('Erro ao obter dados:', error);
      }
      );
  }

  
  details(item: any) {
    this.legendTextArea = 'Details'
    this.detail = item;
    // Converta o objeto JSON para uma string formatada com espaço de indentação de 2
    const formattedJson = JSON.stringify(this.detail, null, 2);
    // Atribua a string formatada à propriedade do seu componente (formattedJson)
    this.formattedJson = formattedJson;
    console.log(this.detail)
    this.poModal.open();
  }

  onClick() {
    alert('Po Button!');
  }
  onCollapseDetail() {
    this.totalExpanded -= 1;
    this.totalExpanded = this.totalExpanded < 0 ? 0 : this.totalExpanded;
  }

  onExpandDetail() {
    this.totalExpanded += 1;
  }
  private transformToNewJsonFormat(oldItem: OldJsonItem): NewJsonItem {
    return {
      id: oldItem.id,
      companyName: oldItem.companyName,
      tenantName: oldItem.tenantName,
      totvsCode: oldItem.totvsCode,
      cnpj: oldItem.cnpj,
      adminName: oldItem.adminName,
      acceptTerms: oldItem.acceptTerms,
      detail: {
        adminEmail: oldItem.adminEmail,
        tenantId: oldItem.tenantId,
        racTenantId: oldItem.racTenantId,
        phoneNumber: oldItem.phoneNumber,
        apiKey: oldItem.apiKey,
        connectorId: oldItem.connectorId,
        carolTenantID: oldItem.carolTenantID,
        dataInc: oldItem.dataInc,
        dataFimProv: oldItem.dataFimProv,
        idTerm: oldItem.idTerm,
        origemOptin: oldItem.origemOptin,
        userIdOptin: oldItem.userIdOptin,
        userNameOptin: oldItem.userNameOptin,
        dataIncOptin: oldItem.dataIncOptin,
      },
    };
  }
}

  interface OldJsonItem {
    id: number;
    companyName: string;
    tenantId: string;
    racTenantId: string;
    tenantName: string;
    totvsCode: string;
    adminName: string;
    adminEmail: string;
    cnpj: string;
    phoneNumber: string;
    apiKey: string;
    connectorId: string;
    carolTenantID: string;
    dataInc: string;
    dataFimProv: string;
    acceptTerms: boolean;
    idTerm: number;
    origemOptin: string;
    userIdOptin: string;
    userNameOptin: string;
    dataIncOptin: string;
  }

  interface NewJsonItem {
    id: number;
    companyName: string;
    tenantName: string;
    totvsCode: string;
    cnpj: string;
    adminName: string;
    acceptTerms: boolean;
    detail: {
      adminEmail: string;
      tenantId: string;
      racTenantId: string;
      phoneNumber: string;
      apiKey: string;
      connectorId: string;
      carolTenantID: string;
      dataInc: string;
      dataFimProv: string;
      idTerm: number;
      origemOptin: string;
      userIdOptin: string;
      userNameOptin: string;
      dataIncOptin: string;
    };
  }
