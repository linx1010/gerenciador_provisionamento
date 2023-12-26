// management.component.ts
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../app.service';
import { PoDialogService,
  PoTableModule, 
  PoModalComponent, 
  PoTableAction, 
  PoTableColumn, 
  PoNotificationService,
  PoModule, 
  PoFieldModule,
  PoDynamicFormField,
  PoDynamicFormFieldChanged,
  PoDynamicFormComponent,
  PoWidgetModule,
  PoAccordionModule,
  } from '@po-ui/ng-components';

  import { PoCodeEditorComponent } from '@po-ui/ng-code-editor';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers: [AppService, PoDialogService],
})
export class ManagementComponent implements OnInit {
  @ViewChild("modalDetails")modalDetails!: PoModalComponent;
  @ViewChild("modalProvision")modalProvision!: PoModalComponent;
  @ViewChild('modalData') modalData!: PoModalComponent;
  @ViewChild("editor") editor!:PoCodeEditorComponent;
  @ViewChild('formModalProvision') formModalProvision!: PoDynamicFormComponent;

  items: any;
  columns: Array<PoTableColumn> = [];
  fieldsForm:Array<PoDynamicFormField> = [];
  detail: any;
  total: number = 0;
  totalExpanded = 0;
  loadingOverlay = false;
  legendTextArea : any;
  formattedJson: string = '';
  formTitle: string = 'Provisioning';
  labelSend :string = '';
  iconToken : string = 'po-icon po-icon-lock-off';
  iconButtonForm : string = 'po-icon po-icon-lock-off';
  menuItemSelected: string = '';
  formData = {};


  // po-icon po-icon-handshake
  actions: Array<PoTableAction> = [
    // { action: this.permission.bind(this),icon: 'po-icon po-icon-handshake',label: 'Re-Provision'},
    { action: this.permission.bind(this), icon: 'po-icon po-icon-security-guard', label: 'Resend Permission' },
    { action: this.idSecret.bind(this), icon: 'po-icon po-icon-eye-off', label: 'Id and Secret' },
    { action: this.onSendData.bind(this), icon: 'po-icon po-icon-chart-columns', label: 'Charts Analisys' },
    { action: this.details.bind(this), icon: 'po-icon-info', label: 'Details' }
  ];

  constructor(
    private serviceApp: AppService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.legendTextArea = 'Overlay';
    this.columns = this.serviceApp.getColumn();
    this.companysIn(); 
    const token = sessionStorage.getItem('token');
    this.iconToken = token ? 'po-icon po-icon-lock' : 'po-icon po-icon-lock-off';
  }

  
  onSendData(item: any) {
    this.detail = item;
    this.modalData.open();
  }

  onClickAuthorize() {
    if ('secretKey'in this.formModalProvision.value){
      sessionStorage.setItem('token', this.formModalProvision.value['secretKey']);
    }else{
      sessionStorage.setItem('token', 'D9A58469-7B5E-477B-83A8-B7FD463CB241');
    }
    this.iconToken='po-icon po-icon-lock'
    this.iconButtonForm = 'po-icon po-icon-lock'
  }
  
  onClickSend() {
    alert('Not Yet!');
  }
  onClick() {
    alert('Not Yet!');
  }
  
  onClickForm() {
    switch( this.labelSend) {
    case 'Send':
      this.onClickSend()
      break;
    case 'Authorize':
      this.onClickAuthorize()
      break
    default:
      alert('Not Yet!');
    }
  }

  onClickToken() {
    this.formTitle = 'Authentication';
    this.iconToken='po-icon po-icon-lock-off'
    this.iconButtonForm = 'po-icon po-icon-lock-off'
    this.formFieldsToken();
    this.modalProvision.open();
  }

  formFieldsBuild(){
    this.fieldsForm = [
      { property: 'name', label:'User Fluig', required: true, showRequired: true },
      {property: 'secretKey',label: 'Secret Key',secret: true,placeholder: 'Type your password'},
      { property: 'totvsCode', label:'Totvs Code', required: true, showRequired: true },
      { property: 'tenantName', label:'Tenant Name', required: true, showRequired: true },
      { property: 'cnpj', label:'CNPJ', required: true, showRequired: true },
      { property: 'phone', label:'Phone', required: true, showRequired: true, mask: '(99) 99999-9999'}
    ];
    this.labelSend = 'Send'
  };

  formFieldsToken(){
    this.fieldsForm = [
      {property: 'secretKey',label: 'Token',secret: true,placeholder: 'Type your token'},    
    ];
    this.labelSend = 'Authorize'
  };
  
  message(item: any) {
    this.detail = item;
    this.poNotification.warning('Request messages denied!');
  }

  permission(item: any) {
    this.detail = item;
    this.resendPermission(item);
  }

  companysIn(): void {
    this.loadingOverlay = true;
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
        this.iconToken='po-icon po-icon-lock-off';
        this.poNotification.warning('Request clients denied!');
      }
    );
  }

  idSecret(item:any): void {
    this.detail = item;
    this.loadingOverlay = true;
    this.serviceApp.completeMessages(item['cnpj']).subscribe(
      (data) => {
        this.loadingOverlay = false;
        const formattedJson = JSON.stringify(data, null, 2);
        this.formattedJson = formattedJson;
        this.editor.writeValue(this.formattedJson)
        console.log('Dados recebidos:', data);
        this.modalDetails.open();
      },
      (error) => {
        this.loadingOverlay = false;
        console.error('Erro ao obter dados:', error);
      }
    );
  }

  resendPermission(item:any): void {
    this.detail = item;
    this.loadingOverlay = true;
    this.serviceApp.permissionSimulator(item['racTenantId']).subscribe(
      (data) => {
        this.loadingOverlay = false;
        const formattedJson = JSON.stringify(data, null, 2);
        this.poNotification.success('Send Permission success!');
        console.log('Dados recebidos:', formattedJson);
      },
      (error) => {
        this.loadingOverlay = false;
        this.poNotification.error('Send Permission Fail!');
        console.error('Erro ao obter dados:', error);
      }
    );
  }

  details(item: any) {
    this.legendTextArea = 'Details'
    this.detail = item;
    const formattedJson = JSON.stringify(this.detail, null, 2);
    this.formattedJson = formattedJson;
    this.editor.writeValue(this.formattedJson)
    console.log(this.detail)
    this.modalDetails.open();
  }

  provisionClick() {
    this.formTitle= 'Provisioning';
    this.formFieldsBuild();
    this.iconButtonForm = 'po-icon po-icon-handshake'
    this.modalProvision.open();
  }

  onRefresh() {
    this.items =[];
    this.companysIn();
  }

  onCollapseDetail() {
    this.totalExpanded -= 1;
    this.totalExpanded = this.totalExpanded < 0 ? 0 : this.totalExpanded;
  }

  onExpandDetail() {
    this.totalExpanded += 1;
  }
  // encapsulamento de dados para exibição da tabela
  private transformToNewJsonFormat(oldItem: OldJsonItem): NewJsonItem {
    return {
      id: oldItem.id,
      companyName: oldItem.companyName.trim(),
      tenantName: oldItem.tenantName.trim(),
      totvsCode: oldItem.totvsCode,
      cnpj: oldItem.cnpj.trim(),
      adminName: oldItem.adminName,
      acceptTerms: oldItem.acceptTerms ? 'accepted' : 'notaccepted',
      racTenantId: oldItem.racTenantId,
      detail: {
        tenantId: oldItem.tenantId.trim(),
        adminEmail: oldItem.adminEmail,
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
  acceptTerms: string;
  racTenantId: string;
  detail: {
    tenantId: string;
    adminEmail: string;
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
