import { Injectable } from '@angular/core';

import { PoTableColumn, PoTableDetail } from '@po-ui/ng-components';

@Injectable()
export class AppService {
    getColumns(): Array<PoTableColumn> {
        const airfareDetail: PoTableDetail = {
          columns: [
            { property: 'package' },
            { property: 'tour' },
            { property: 'time', label: 'Departure time', type: 'time', format: 'HH:mm' },
            { property: 'distance', label: 'Distance (Miles)', type: 'number', format: '1.0-5' }
          ],
          typeHeader: 'top'
        };
    
        return [
          {
            property: 'status',
            type: 'label',
            labels: [
              { value: 'available', color: 'color-11', label: 'Available' },
              { value: 'reserved', color: 'color-08', label: 'Reserved' },
              { value: 'closed', color: 'color-07', label: 'Closed' }
            ]
          },
          { property: 'country' },
          { property: 'destination' },
          
          { property: 'date', type: 'date' },
          { property: 'returnDate', label: 'Return Date', type: 'date' },
          { property: 'value', type: 'currency', format: 'USD' },
          { property: 'id', label: 'Flight Number', type: 'number' },
          {
            property: 'onBoardService',
            label: 'On Board Service',
            type: 'boolean',
            boolean: {
              trueLabel: 'Yes',
              falseLabel: 'No'
            }
          },
          { property: 'detail', label: 'Details', type: 'detail', detail: airfareDetail }
        ];
      }
    
      getItems() {
        return [
          {
            id: 11234,
            initials: 'BR',
            country: 'Brazil',
            value: 1000.0,
            date: '2018-10-09',
            returnDate: '2018-11-01',
            class: 'Economic',
            onBoardService: false,
            destination: 'Rio de Janeiro',
            airline: 'Azul',
            status: 'available',
            region: 'Latin America',
            detail: [
              {
                package: 'Basic',
                tour: 'City tour by public bus and visit to the main museums.',
                time: '20:10:10',
                distance: '1000'
              },
              {
                package: 'Intermediary',
                tour: 'City tour by van and guided visit to the main museums.',
                time: '09:15:19',
                distance: '2000'
              },
              {
                package: 'Complete',
                tour: 'VIP city tour, music show with dinner and guided tour to the main museums.',
                time: '07:10:20',
                distance: '3000'
              }
            ]
          },
          {
            id: 22467,
            initials: 'FR',
            country: 'France',
            value: 5000.0,
            date: '2019-12-13',
            returnDate: '2019-12-31',
            class: 'Economic',
            onBoardService: false,
            destination: 'Paris',
            airline: 'British Airways',
            status: 'closed',
            region: 'Alps',
            detail: [
              {
                package: 'Basic',
                tour: 'City tour by public bus and visit to the main museums.',
                time: '10:15:10',
                distance: '4800'
              },
              {
                package: 'Intermediary',
                tour: 'City tour by van and guided visit to the main museums.',
                time: '22:15:10',
                distance: '11000'
              },
              {
                package: 'Complete',
                tour: 'VIP city tour, music show with dinner and guided tour to the main museums.',
                time: '10:15:10',
                distance: '1000'
              }
            ]
          },
          {
            id: 40670,
            initials: 'SN',
            country: 'Senegal',
            value: 3200.0,
            date: '2017-11-22',
            returnDate: '2018-12-01',
            class: 'Economic',
            onBoardService: false,
            destination: 'Dakar',
            airline: 'Iberia',
            status: 'closed',
            region: 'Western Africa'
          },
          {
            id: 34679,
            initials: 'PT',
            country: 'Portugal',
            value: 5500.0,
            date: '2017-10-10',
            returnDate: '2018-10-20',
            class: 'Economic',
            onBoardService: false,
            destination: 'Lisbon',
            airline: 'Air Europa',
            status: 'closed',
            region: 'Mediterranean'
          },
          {
            id: 48999,
            initials: 'RU',
            country: 'Russia',
            value: 6700.0,
            date: '2019-01-17',
            returnDate: '2019-02-20',
            class: 'First Class',
            onBoardService: true,
            destination: 'Moscow',
            airline: 'Lufthansa',
            status: 'reserved',
            region: 'Caucasus'
          },
          {
            id: 48999,
            initials: 'US',
            country: 'United States',
            value: 2700.49,
            date: '2018-10-17',
            returnDate: '2018-10-29',
            class: 'Economic',
            onBoardService: false,
            destination: 'Los Angeles',
            airline: 'American Airlines',
            status: 'reserved',
            region: 'North America'
          },
          {
            id: 54563,
            initials: 'CL',
            country: 'Chile',
            value: 2000.0,
            date: '2018-10-20',
            returnDate: '2018-11-01',
            destination: 'Cusco',
            class: 'Economic',
            onBoardService: false,
            airline: 'LATAM',
            status: 'available',
            region: 'Latin America'
          },
          {
            id: 64568,
            initials: 'MX',
            country: 'Mexico',
            value: 2100.0,
            date: '2018-03-10',
            returnDate: '2018-05-09',
            destination: 'Mexico City',
            class: 'Economic',
            onBoardService: false,
            airline: 'Aero México',
            status: 'available',
            region: 'Latin America',
            detail: [
              {
                package: 'Basic',
                tour: 'City tour by public bus and visit to the main museums.',
                time: '12:10:10',
                distance: '2200'
              },
              {
                package: 'Intermediary',
                tour: 'City tour by van and guided visit to the main museums.',
                time: '11:10:10',
                distance: '1500'
              },
              {
                package: 'Complete',
                tour: 'VIP city tour, music show with dinner and guided tour to the main museums.',
                time: '16:10:10',
                distance: '1800'
              }
            ]
          },
          {
            id: 75456,
            initials: 'IE',
            country: 'Ireland',
            value: 6300.0,
            date: '2018-10-14',
            returnDate: '2018-10-30',
            destination: 'Cork',
            class: 'First Class',
            onBoardService: true,
            airline: 'Lufthansa',
            status: 'reserved',
            region: 'British Isle'
          },
          {
            id: 23445,
            initials: 'ZA',
            country: 'South Africa',
            value: 1900.0,
            date: '2018-12-10',
            returnDate: '2018-12-25',
            destination: 'Cape Town',
            class: 'Economic',
            onBoardService: false,
            airline: 'South African Airways',
            status: 'available',
            region: 'Southern Africa'
          },
          {
            id: 19238,
            initials: 'AU',
            country: 'Australia',
            value: 6300.0,
            date: '2018-10-14',
            returnDate: '2018-10-30',
            destination: 'Sydney',
            class: 'First Class',
            onBoardService: true,
            airline: 'Jetstar Airways',
            status: 'reserved',
            region: 'Australasia'
          },
          {
            id: 85456,
            initials: 'JP',
            country: 'Japan',
            value: 5900.0,
            date: '2018-10-25',
            returnDate: '2018-11-10',
            destination: 'Tokio',
            class: 'Executive',
            onBoardService: true,
            airline: 'Japan Airlines',
            status: 'available',
            region: 'East Asia'
          },
          {
            id: 94565,
            initials: 'CN',
            country: 'China',
            value: 2900.0,
            date: '2018-10-10',
            returnDate: '2018-10-25',
            destination: 'Beijing',
            class: 'Economic',
            onBoardService: false,
            airline: 'Malaysia Airlines',
            status: 'available',
            region: 'East Asia'
          },
          {
            id: 32330,
            initials: 'UK',
            country: 'England',
            value: 2090.5,
            date: '2018-10-07',
            returnDate: '2018-11-15',
            destination: 'London',
            class: 'Executive',
            onBoardService: true,
            airline: 'British Airways',
            status: 'available',
            region: 'British Isle'
          },
          {
            id: 14560,
            initials: 'CA',
            country: 'Canada',
            value: 2090.5,
            date: '2018-10-07',
            returnDate: '2018-10-20',
            destination: 'Quebec',
            class: 'Economic',
            onBoardService: false,
            airline: 'American Airlines',
            status: 'available',
            region: 'North America'
          },
          {
            id: 93800,
            initials: 'IS',
            country: 'Iceland',
            value: 6300.0,
            date: '2018-10-12',
            returnDate: '2018-10-27',
            destination: 'Reykjavík',
            class: 'Economic',
            onBoardService: false,
            airline: 'Star Alliance',
            status: 'available',
            region: 'Nordics'
          },
          {
            id: 34239,
            initials: 'DE',
            country: 'Germany',
            value: 3070.5,
            date: '2018-10-07',
            returnDate: '2018-10-20',
            destination: 'Berlin',
            class: 'Executive',
            onBoardService: true,
            airline: 'LATAM',
            status: 'available',
            region: 'Danube'
          },
          {
            id: 45611,
            initials: 'AR',
            country: 'Argentina',
            value: 3500.5,
            date: '2018-12-07',
            returnDate: '2018-12-29',
            destination: 'Ushuaia',
            class: 'Economic',
            onBoardService: false,
            airline: 'LATAM',
            status: 'reserved',
            region: 'Latin America'
          }
        ];
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