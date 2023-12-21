import { PoTableColumn, PoTableDetail } from '@po-ui/ng-components';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private accessToken: string = '';

  constructor(private http: HttpClient) {}

  getToken(): string {
    const token = sessionStorage.getItem('token');
    return token !== null ? token : '';
  }
  companyInfo(): Observable<any> {
    this.accessToken = this.getToken();
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'x-access-token': this.accessToken,
    });
    let url ='/provisioning/api/Company/CompanyInfo'

    // Faz a requisição HTTP com os headers
    return this.http.get(url, { headers });
  }
  completeMessages(cnpj: string): Observable<any> {
    this.accessToken = this.getToken();
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'x-access-token': this.accessToken,
    });
    let url ='/provisioning/api/Company/CompanyCompleteMessages/'+cnpj

    // Faz a requisição HTTP com os headers
    return this.http.get(url, { headers });
  }
  permissionSimulator(rac: string): Observable<any> {
    this.accessToken = this.getToken();
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'x-access-token': this.accessToken,
      'Ractenantid':rac
    });
    let url ='https://painel-backoffice.totvs.app/datalake/api/Manager/PermissionSimulator'
    
    // Faz a requisição HTTP com os headers
    return this.http.get(url, { headers });
  }
  
  financialAlert(rac: string): Observable<any> {
    this.accessToken = this.getToken();
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'x-access-token': this.accessToken,
      'Ractenantid':rac,
      'frequency':rac,
      'companyGroup':rac,
      'branchs':rac
    });
    let url ='https://painel-backoffice.totvs.app/datalake/api/CarolSubscription/GetData/FinancialForecast?retornarJson=true'
    // Faz a requisição HTTP com os headers
    return this.http.get(url, { headers });
  }

  
  ruptureAlert(rac: string): Observable<any> {
    this.accessToken = this.getToken();
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'x-access-token': this.accessToken,
      'Ractenantid':rac
    });
    let url ='https://painel-backoffice.totvs.app/datalake/api/CarolSubscription/GetData/RuptureAlert?retornarJson=true'
    // Faz a requisição HTTP com os headers
    return this.http.get(url, { headers });
  }
  
  demandAlert(rac: string): Observable<any> {
    this.accessToken = this.getToken();
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'x-access-token': this.accessToken,
      'Ractenantid':rac
    });
    let url ='https://painel-backoffice.totvs.app/datalake/api/CarolSubscription/GetData/DemandAlert?retornarJson=true'
    // Faz a requisição HTTP com os headers
    return this.http.get(url, { headers });
  }
  




  getColumn(): Array<PoTableColumn> {
    const columnDetail: PoTableDetail = {
      columns: [
        { property: 'tenantId', label: 'Tenant Id'},
        { property: 'racTenantId', label: 'RAC Id'},
        { property: 'phoneNumber', label: 'Carol Tenant'}
      ],
      typeHeader: 'top'
    };
    return [
      
      { property: 'id', label: 'ID', type: 'number',width: '01%' },
      {
        property: 'acceptTerms',
        label: 'accept Terms',
        type: 'label',
        width: '10%',
        labels: [
          { value: 'accepted', color: '#2c85c8', label: 'Accepted', icon:'po-icon po-icon-ok'},
          { value: 'notaccepted', color: '#c64840', label: 'Not Accepted', icon:'po-icon po-icon-close'}
        ]
      },
      { property: 'totvsCode',width: '19%', label: 'Totvs Code'},
      { property: 'racTenantId',width: '30%', label: 'Tenant'},
      { property: 'cnpj',width: '10%', label: 'CNPJ'},
      { property: 'tenantName',width: '30%', label:'Tenant Name' },
      
      // { property: 'detail', label: 'Details', type: 'detail', detail: columnDetail }
    ];
  }
  getClientsMock(){
    return [
        {
          id: 1,
          companyName: 'JHO ADMINISTRACAO E PARTICIPACOES LTDA',
          tenantId: '087ff27a49754817b3d0ed3d045b43ec',
          racTenantId: '087ff27a-4975-4817-b3d0-ed3d045b43ec',
          tenantName: 'JHO ADMINISTRACAO E PARTICIPACOES LTDA',
          totvsCode: 'TFCRFS',
          adminName: 'HENRIQUE LOPES PEREIRA',
          adminEmail: 'squad.ba@totvs.com.br',
          cnpj: '17344461000184',
          phoneNumber: '11976943948',
          apiKey: '13faaffc51d94340bd45238aa961075e',
          connectorId: 'bb01e5406d1f464ea62b260b7ef56f6a',
          carolTenantID: 'b44a3ce2e49c46b6b82010616bb31019',
          dataInc: '2023-04-05T22:05:41.226461',
          dataFimProv: '2023-04-06T11:59:11.729235',
          acceptTerms: true,
          idTerm: 2,
          origemOptin: '::ffff:192.168.1.1',
          userIdOptin: '000000',
          userNameOptin: 'Administrador',
          dataIncOptin: '2023-09-14T17:56:35.489171'
        },
        {
          id: 3,
          companyName: 'Nortox SA',
          tenantId: 'ugt1yw69t8d488ir1557771689582',
          racTenantId: 'd1ca26fd-c4ac-48d2-8020-20da9537b643',
          tenantName: 'Nortox SA',
          totvsCode: 'T05132',
          adminName: 'SquadBa',
          adminEmail: 'squad.ba@totvs.com.br',
          cnpj: '75263400000199',
          phoneNumber: '011980404744',
          apiKey: '4310bdebb7b34f799ab0930ba9d36bc8',
          connectorId: 'a2a01628abe34ba19bc4ec3bc37b47e5',
          carolTenantID: '8ce5ca2b13c4468b9a053cd4ddd9cdc8',
          dataInc: '2023-04-05T22:05:41.226461',
          dataFimProv: '2023-04-06T11:59:11.729235',
          acceptTerms: false,
          idTerm: 2,
          origemOptin: '127.0.0.1',
          userIdOptin: '000000',
          userNameOptin: 'A',
          dataIncOptin: '2023-01-01T00:00:00'
        }
      ]
  }
}