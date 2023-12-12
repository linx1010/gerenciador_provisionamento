import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Adicionado
import { PoDialogService, PoModalComponent, PoTableAction, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';
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
  actions: Array<PoTableAction> = [
    {
      action: this.permission.bind(this),
      icon: 'po-icon po-icon-handshake',
      label: 'Provision'
    },
    { action: this.permission.bind(this), icon: 'po-icon po-icon-security-guard', label: 'Resend Permission' },
    { action: this.message.bind(this), icon: 'po-icon po-icon-message', label: 'Messages' },
    { action: this.idSecret.bind(this), icon: 'po-icon po-icon-settings', label: 'Access config' },
    { action: this.details.bind(this), icon: 'po-icon-info', label: 'Details' }
  ];

  constructor(
    private serviceApp: AppService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.columns = this.serviceApp.getColumn();
    const oldItems: OldJsonItem[] = this.serviceApp.getClients();
    this.obterDadosDoEndpoint();
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

  obterDadosDoEndpoint(): void {
    this.serviceApp.companyInfo().subscribe(
      (data) => {
        this.items = data;
        console.log('Dados recebidos:', this.items);
      },
      (error) => {
        console.error('Erro ao obter dados:', error);
      }
    );
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
    this.poModal.open();
  }

  onClick() {
    alert('Po Button!');
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
