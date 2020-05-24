import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';
import { DataResolverService } from 'src/app/services/common/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: {isCache: DataResolverService},
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CustomComponentsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
