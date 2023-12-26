import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Adicionado
import { PoDialogService, 
  PoNotificationService,
  PoMenuItem,
  } from '@po-ui/ng-components';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, PoDialogService]
})
export class AppComponent implements OnInit {
 

  
  menuItemSelected: string = 'Home';
  
  menus = [
    { label: 'Home', action: this.printMenuAction.bind(this), icon: 'po-icon po-icon-home' },
    { label: 'Manager', action: this.printMenuAction.bind(this), icon: 'po-icon-settings', shortLabel: 'Register' },
    // Adicione outros itens conforme necessário
  ];

  

  constructor(
    private serviceApp: AppService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    
  }
  //botao generico para teste
  onClick() {
    alert('Not Yet!');
  }
  

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
    switch(menu.label){
      case 'Manager':
        this.router.navigate(['/manager']); // Navegue para a rota de gerenciamento
        break;
      case 'Home':
        this.router.navigate(['/home']); // Navegue para a rota de gerenciamento
        break;
      default:
          this.router.navigate(['/home']); // Navegue para a rota de gerenciamento

    }
    
  }
}
