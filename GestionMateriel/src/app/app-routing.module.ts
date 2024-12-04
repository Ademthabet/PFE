import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connection/connection.component';
import { RmComponent } from './rm/rm.component';
import { ValidationDemComponent } from './rm/validationDemande/validationDemande.component';
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
import { ModifierBurComponent } from './admin/updateBureau/updateBureau.component';
import { SuppBurComponent } from './admin/deleteBureau/deleteBureau.component';
import { CreerCompteComponent } from './createAccount/createAccount.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { ConsulterMatComponent } from './employe/consultMateriel/consultMateriel.component';
import { HistoriqueComponent } from './rm/statistics/statistics.component';
import { AjouterBurComponent } from './admin/addBureau/addBureau.component';

const routes: Routes = [
  { path: '', component: ConnexionComponent },

  { path: 'rm', component: RmComponent },
  { path: 'valider', component: ValidationDemComponent },
  { path: 'ajouterM', component: AjouterMComponent },
  { path: 'modifierM', component: ModifierMComponent },
  { path: 'suppM', component: SuppMComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'affecter', component: AffectationMComponent },
  { path: 'statistique', component: HistoriqueComponent },

  { path: 'employe', component: EmployeComponent },
  { path: 'ajouteDem', component: AjouteDemComponent },
  { path: 'consulterDem', component: ConsulterDemComponent },
  { path: 'modifierDem', component: ModifierDemComponent },
  { path: 'supprimerDem', component: SuppDemComponent },
  { path: 'consulterMat', component: ConsulterMatComponent },
  { path: 'profileEmp', component: ProfileEmpComponent },

  { path: 'admin', component: AdminComponent },
  { path: 'ajouterEmp', component: AjouterEmpComponent },
  { path: 'modifierEmp', component: ModifierEmpComponent },
  { path: 'ajouterDep', component: AjouterDepComponent },
  { path: 'modifierDep', component: ModifierDepComponent },
  { path: 'supprimerDep', component: SuppDepComponent },
  { path: 'ajouterBur', component: AjouterBurComponent },
  { path: 'modifierBur', component: ModifierBurComponent },
  { path: 'supprimerBur', component: SuppBurComponent },
  { path: 'profileAdmin', component: ProfileAdminComponent },

  { path: 'créer un compte', component: CreerCompteComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
