import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { RmComponent } from './rm/rm.component';
import { ValidationDemComponent } from './rm/validation-dem/validation-dem.component';
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
import { OktaCallbackComponent } from '@okta/okta-angular';
import { ConsulterMatComponent } from './employe/consulter-mat/consulter-mat.component';
import { HistoriqueComponent } from './rm/historique/historique.component';

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
