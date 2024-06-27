import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { RmComponent } from './rm/rm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationDemComponent } from './rm/validation-dem/validation-dem.component';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './rm/profile/profile.component';
import { AffectationMComponent } from './rm/affectation-m/affectation-m.component';
import { EmployeComponent } from './employe/employe.component';
import { ProfileEmpComponent } from './employe/profile-emp/profile-emp.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { AjouterMComponent } from './rm/ajouter-m/ajouter-m.component';
import { ModifierMComponent } from './rm/modifier-m/modifier-m.component';
import { SuppMComponent } from './rm/supp-m/supp-m.component';
import { AjouteDemComponent } from './employe/ajoute-dem/ajoute-dem.component';
import { ConsulterDemComponent } from './employe/consulter-dem/consulter-dem.component';
import { ModifierDemComponent } from './employe/modifier-dem/modifier-dem.component';
import { SuppDemComponent } from './employe/supp-dem/supp-dem.component';
import { AjouterEmpComponent } from './admin/ajouter-emp/ajouter-emp.component';
import { ModifierEmpComponent } from './admin/modifier-emp/modifier-emp.component';
import { AjouterDepComponent } from './admin/ajouter-dep/ajouter-dep.component';
import { ModifierDepComponent } from './admin/modifier-dep/modifier-dep.component';
import { SuppDepComponent } from './admin/supp-dep/supp-dep.component';
import { AjouterBurComponent } from './admin/ajouter-bur/ajouter-bur.component';
import { ModifierBurComponent } from './admin/modifier-bur/modifier-bur.component';
import { SuppBurComponent } from './admin/supp-bur/supp-bur.component';
import { CreerCompteComponent } from './creer-compte/creer-compte.component';
import { ConsulterMatComponent } from './employe/consulter-mat/consulter-mat.component';
import { HistoriqueComponent } from './rm/historique/historique.component';
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
