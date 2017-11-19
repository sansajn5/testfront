import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';



import { PagesComponent } from './pages.component';
import {DashboardComponent} from './Dashboard/dashboard.component';

@NgModule({
  imports: [CommonModule, routing],
  declarations: [PagesComponent, DashboardComponent]
})
export class PagesModule {}
