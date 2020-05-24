import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServicesItemComponent } from './services-item/services-item.component';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';
import { DataResolverService } from 'src/app/services/common/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ServicesListComponent,
    resolve: {isCache: DataResolverService},
  },
  {
    path: ':id',
    component: ServicesItemComponent,
    resolve: {isCache: DataResolverService},
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    CustomComponentsModule,
  ],
  declarations: [
    ServicesListComponent,
    ServicesItemComponent,
  ],
})
export class ServicesModule { }
