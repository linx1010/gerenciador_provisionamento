import { Component, OnInit, ViewChild } from '@angular/core';

import { PoMenuItem,
  PoDialogService,
  PoModalComponent,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
  PoBreadcrumbModule,
  PoNotificationService
} from '@po-ui/ng-components';

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
  columnsDefault: Array<PoTableColumn> = [];
  detail: any;
  total: number = 0;
  totalExpanded = 0;
  initialColumns: Array<any> = [];
  actions: Array<PoTableAction> = [
    {
      action: this.permission.bind(this),
      icon: 'po-icon po-icon-handshake',
      label: 'Provision'
    },
    { action: this.permission.bind(this), icon: 'po-icon po-icon-security-guard', label: 'Resend Permission' },
    { action: this.message.bind(this), icon: 'po-icon po-icon-mail', label: 'Messages' },
    { action: this.idSecret.bind(this), icon: 'po-icon po-icon-settings', label: 'Acess config' },
    { action: this.details.bind(this), icon: 'po-icon-info', label: 'Details' }
  ];
  breadcrumb: { label: any; }[] = [];

  constructor(
    private serviceApp: AppService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
  ) {}
  

  ngOnInit(): void {

    this.columns = this.serviceApp.getColumn();
    const oldItems: OldJsonItem[] = this.serviceApp.getClients();

    // Transformar os itens para o novo formato
    this.items = oldItems.map(oldItem => this.transformToNewJsonFormat(oldItem));
   
  }
  message(item: any) {
    this.detail = item;
    this.poNotification.warning('Request messages denied!');
  }
  permission(item: any) {
    this.detail = item;
    this.poNotification.success('Send Permission success!');
  }
  idSecret(item: any) {
    this.detail = item;
    this.poModal.open();
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
  onCollapseDetail() {
    this.totalExpanded -= 1;
    this.totalExpanded = this.totalExpanded < 0 ? 0 : this.totalExpanded;
  }

  onExpandDetail() {
    this.totalExpanded += 1;
  }
  details(item: any) {
    this.detail = item;
    this.breadcrumb = [
      { label: (this.detail.tenantName).toUpperCase() }, 
      { label: (this.detail.totvsCode).toUpperCase()},
      { label: (this.detail.cnpj).toUpperCase() }
    ];
    this.detail['info']=this.detail.tenantName.trim().slice(0,20)+' > '+this.detail.totvsCode.trim()
    this.poModal.open();
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
