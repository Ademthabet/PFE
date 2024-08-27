import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connection/connection.component';
import { RmComponent } from './rm/rm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationDemComponent } from './rm/validationDemande/validationDemande.component';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './rm/profile/profile.component';
import { AffectationMComponent } from './rm/affectMateriel/affectMateriel.component';
import { EmployeComponent } from './employe/employe.component';
import { ProfileEmpComponent } from './employe/profilEmploye/profilEmploye.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileAdminComponent } from './admin/profilAdmin/profilAdmin.component';
import { AjouterMComponent } from './rm/addMateriel/addMateriel.component';
import { ModifierMComponent } from './rm/updateMateriel/updateMateriel.component';
import { SuppMComponent } from './rm/deleteMateriel/deleteMateriel.component';
import { AjouteDemComponent } from './employe/addDemande/addDemande.component';
import { ConsulterDemComponent } from './employe/consultDemande/consultDemande.component';
import { ModifierDemComponent } from './employe/updateDemande/updateDemande.component';
import { SuppDemComponent } from './employe/deleteDemande/deleteDemande.component';
import { AjouterEmpComponent } from './admin/addEmploye/addEmploye.component';
import { ModifierEmpComponent } from './admin/updateEmploye/updateEmploye.component';
import { AjouterDepComponent } from './admin/addDepartement/addDepartement.component';
import { ModifierDepComponent } from './admin/updateDepartement/updateDepartement.component';
import { SuppDepComponent } from './admin/deleteDepartement/deleteDepartement.component';
import { AjouterBurComponent } from './admin/addBureau/addBureau.component';
import { ModifierBurComponent } from './admin/updateBureau/updateBureau.component';
import { SuppBurComponent } from './admin/deleteBureau/deleteBureau.component';
import { CreerCompteComponent } from './createAccount/createAccount.component';
import { ConsulterMatComponent } from './employe/consultMateriel/consultMateriel.component';
import { HistoriqueComponent } from './rm/statistics/statistics.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    RmComponent,
    ValidationDemComponent,
    ProfileComponent,
    AffectationMComponent,
    EmployeComponent,
    ProfileEmpComponent,
    AdminComponent,
    ProfileAdminComponent,
    AjouterMComponent,
    ModifierMComponent,
    SuppMComponent,
    AjouteDemComponent,
    ConsulterDemComponent,
    ModifierDemComponent,
    SuppDemComponent,
    AjouterEmpComponent,
    ModifierEmpComponent,
    AjouterDepComponent,
    ModifierDepComponent,
    SuppDepComponent,
    AjouterBurComponent,
    ModifierBurComponent,
    SuppBurComponent,
    CreerCompteComponent,
    ConsulterMatComponent,
    HistoriqueComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [
    DatePipe // Fournir DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
