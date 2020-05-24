import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DataResolverService } from 'src/app/services/common/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ContactUsComponent,
    resolve: {isCache: DataResolverService},
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ContactUsComponent,
  ],
})
export class ContactsModule { }
