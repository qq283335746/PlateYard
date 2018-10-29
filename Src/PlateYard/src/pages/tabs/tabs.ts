import { Component } from '@angular/core';

//import { HomePage } from '../home/home';
import { StockyardPage } from '../stockyard/stockyard';
import { PersonalPage } from '../personal/personal';
import { OperationPage } from '../operation/operation';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = StockyardPage;
  tab2Root: any = OperationPage;
  tab3Root: any = PersonalPage;

  constructor() {

  }
}
