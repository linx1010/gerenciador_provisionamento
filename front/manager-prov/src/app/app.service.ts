import { PoTableColumn, PoTableDetail } from '@po-ui/ng-components';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'https://painel-backoffice.totvs.app/provisioning/api/Company/CompanyInfo';
  private accessToken = 'D9A58469-7B5E-477B-83A8-B7FD463CB241';

  constructor(private http: HttpClient) {}

  companyInfo(): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'x-access-token': this.accessToken,
    });

    // Faz a requisição HTTP com os headers
    return this.http.get(this.apiUrl, { headers });
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
      
      { property: 'id', label: 'ID', type: 'number', color:'c' },
      {
        property: 'acceptTerms',
        label: 'accept Terms',
        type: 'boolean',
        color: (row: { acceptTerms: any; }) => (row.acceptTerms ? 'color-03' : 'color-07'),
        boolean: {
          trueLabel: 'Accept',
          falseLabel: 'Not Accept'
        }
      },
      { property: 'totvsCode', label: 'Totvs Code'},
      { property: 'tenantName', label:'Tenant Name' },
      { property: 'cnpj', label: 'CNPJ'},
      
      // { property: 'detail', label: 'Details', type: 'detail', detail: columnDetail }
    ];
  }
  getClients(){
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
        },
        {
          id: 5,
          companyName: 'PRATICA KLIMAQUIP INDUSTRIA E COMERCIO SA-1623424331751',
          tenantId: 'b33f2c28287d4fd7bef0ae8863617506',
          racTenantId: 'b33f2c28-287d-4fd7-bef0-ae8863617506',
          tenantName: 'PRATICA KLIMAQUIP INDUSTRIA E COMERCIO SA-1623424331751',
          totvsCode: 'TAAKB1',
          adminName: 'SquadBa',
          adminEmail: 'squad.ba@totvs.com.br',
          cnpj: '08574411000100',
          phoneNumber: '011980404744',
          apiKey: '8375efe296764a1a98bee47be1d6da4b',
          connectorId: '72ac21c492ae46afac35bc924df080c9',
          carolTenantID: '163697f637ac40a18f7e27b7ab97bd8f',
          dataInc: '2023-04-05T22:05:41.226461',
          dataFimProv: '2023-04-06T11:59:11.729235',
          acceptTerms: true,
          idTerm: 2,
          origemOptin: '127.0.0.1',
          userIdOptin: '000000',
          userNameOptin: 'A',
          dataIncOptin: '2023-01-01T00:00:00'
        },
        {
          id: 6,
          companyName: 'FCC DO BRASIL LTDA',
          tenantId: 'vallfpdm8buaat2b1477654896330',
          racTenantId: '28a9ca08-5be8-44c6-8846-3220bbe69048',
          tenantName: 'FCC DO BRASIL LTDA',
          totvsCode: 'T04858',
          adminName: 'SquadBa',
          adminEmail: 'squad.ba@totvs.com.br',
          cnpj: '02672357000141',
          phoneNumber: '011980404744',
          apiKey: 'ef7f16003e4541b4b7d2289801018c5a',
          connectorId: '01692c75281344da801c4bce780ce73a',
          carolTenantID: '25de922b2bf94ea39fa5f99ad09b8ed3',
          dataInc: '2023-04-05T22:05:41.226461',
          dataFimProv: '2023-04-06T11:59:11.729235',
          acceptTerms: true,
          idTerm: 2,
          origemOptin: '127.0.0.1',
          userIdOptin: '000000',
          userNameOptin: 'A',
          dataIncOptin: '2023-01-01T00:00:00'
        }
      ]
  }
}