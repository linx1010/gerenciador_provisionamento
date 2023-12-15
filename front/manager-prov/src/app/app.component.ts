import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Adicionado
import { PoDialogService, 
  PoModalComponent, 
  PoTableAction, 
  PoTableColumn, 
  PoNotificationService,
  PoModule, 
  PoFieldModule,
  PoDynamicFormField,
  PoDynamicFormFieldChanged,
  } from '@po-ui/ng-components';
import { AppService } from './app.service';
import { PoCodeEditorComponent } from '@po-ui/ng-code-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, PoDialogService]
})
export class AppComponent implements OnInit {
  @ViewChild("modalDetails")modalDetails!: PoModalComponent;
  @ViewChild("modalProvision")modalProvision!: PoModalComponent;
  @ViewChild("editor") editor!:PoCodeEditorComponent;
  items: any;
  columns: Array<PoTableColumn> = [];
  fieldsForm:Array<PoDynamicFormField> = [];
  detail: any;
  total: number = 0;
  totalExpanded = 0;
  loadingOverlay = false;
  legendTextArea : any;
  formattedJson: string = '';

  actions: Array<PoTableAction> = [
    // { action: this.permission.bind(this),icon: 'po-icon po-icon-handshake',label: 'Re-Provision'},
    // { action: this.message.bind(this), icon: 'po-icon po-icon-message', label: 'Messages' },
    { action: this.permission.bind(this), icon: 'po-icon po-icon-security-guard', label: 'Resend Permission' },
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
    this.formFieldsBuild();
    this.companysIn(); 
  }
  onClick() {
    alert('Not Yet!');
  }
  formFieldsBuild(){
    //Campos do form para novo provisionamento (será descontinuado com atualização do Wizsmartba)
    this.fieldsForm = [
      { property: 'name', label:'User Fluig', required: true, showRequired: true },
      {property: 'secretKey',label: 'Secret Key',secret: true,placeholder: 'Type your password'},
      { property: 'totvsCode', label:'Totvs Code', required: true, showRequired: true },
      { property: 'tenantName', label:'Tenant Name', required: true, showRequired: true },
      { property: 'cnpj', label:'CNPJ', required: true, showRequired: true },
      { property: 'phone', label:'Phone', required: true, showRequired: true, mask: '(99) 99999-9999'}
    ];
  };
  message(item: any) {
    this.detail = item;
    this.poNotification.warning('Request messages denied!');
  }

  permission(item: any) {
    //Envio de nova permissão para o cliente
    this.detail = item;
    this.resendPermission(item);
  }


  companysIn(): void {
    // Recupera os clientes que realizaram o optin em nosso app
    this.loadingOverlay = true; // Ative o overlay
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
  idSecret(item:any): void {
    // recupera os dados das mensagens trocadas com o provisionamento da totvs (incluse Id e Secret de configuração)
    this.detail = item;
    this.serviceApp.completeMessages(item['cnpj']).subscribe(
      (data) => {
        // Desative o overlay quando a requisição for concluída
        this.loadingOverlay = false;
        const formattedJson = JSON.stringify(data, null, 2);
        // Atribua a string formatada à propriedade do seu componente (formattedJson)
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
    //Consumo do EndPoint de envio de nova permissao de acesso para I14
    this.detail = item;
    this.loadingOverlay = true;
    this.serviceApp.permissionSimulator(item['racTenantId']).subscribe(
      (data) => {
        // Desative o overlay quando a requisição for concluída
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
    //Apresenta todos os dados da linha selecionada
    this.legendTextArea = 'Details'
    this.detail = item;
    // Converta o objeto JSON para uma string formatada com espaço de indentação de 2
    const formattedJson = JSON.stringify(this.detail, null, 2);
    // Atribua a string formatada à propriedade do seu componente (formattedJson)
    this.formattedJson = formattedJson;
    this.editor.writeValue(this.formattedJson)
    console.log(this.detail)
    this.modalDetails.open();
  }

  provisionClick() {
    //Abre o form de provisionamento
    this.modalProvision.open();
  }
  onRefresh() {
    // Botão de atualização de tela
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
