import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreerCompteService, Employe } from './creer-compte.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-compte',
  templateUrl: './createAccount.component.html',
  styleUrls: ['./createAccount.component.scss']
})
export class CreerCompteComponent implements OnInit {
  ngOnInit(): void {
  }
  employeForm: FormGroup
  selectedEmployeEmail: string = "";
  employes: Employe[] = [];
  selectedEmploye: Employe | null = null;
  selectedEmployee: Employe | undefined;
  selectedEmployeId: any | undefined;
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private creerCompteService: CreerCompteService, private router: Router, public formBuilder: FormBuilder) {
    this.employeForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: [''],
      tel: [''],
    })
  }
  rechercherEmployeParEmail() {
    const emailToSearchElement: HTMLInputElement | null = document.getElementById("emailToSearch") as HTMLInputElement;
    if (emailToSearchElement) {
      const emailToSearch: string = emailToSearchElement.value;
      this.creerCompteService.rechercherEmployeParEmail(emailToSearch).subscribe(
        (exists: boolean) => {
          if (exists) {
            this.errorMessage = '';
            this.selectedEmploye = { emailChercher: true } as Employe;
            this.employeForm.patchValue({
              nom: this.selectedEmploye.nom,
              prenom: this.selectedEmploye.prenom,
              email: this.selectedEmploye.email,
              password: this.selectedEmploye.password,
              tel: this.selectedEmploye.tel
            });
          } else {
            this.errorMessage = "L'email n'existe pas.";
            this.selectedEmploye = null;
          }
        },
        (error) => {
          console.error("Erreur lors de la recherche de l'employé par email :", error);
          this.errorMessage = "Une erreur s'est produite lors de la recherche de l'employé.";
          this.selectedEmploye = null;
        }
      );
    } else {
      console.error("L'élément emailToSearch n'a pas été trouvé.");
    }
  }
  modifierEmploye() {
    if (!this.employeForm.valid || !this.selectedEmploye) {
      console.error('Invalid employe or form data');
      return;
    }
    const updatedEmployeData: Employe = {
      id: this.selectedEmploye.id,
      nom: this.employeForm.value.nom,
      prenom: this.employeForm.value.prenom,
      email: this.employeForm.value.email,
      password: this.employeForm.value.password,
      tel: this.employeForm.value.tel
    };
    this.creerCompteService.modifierEmploye(updatedEmployeData).subscribe(
      () => {
        console.log('Employé mis à jour avec succès');
        this.successMessage = 'Employé mis à jour avec succès';
        this.errorMessage = '';
        this.router.navigate(['']);
        this.employeForm.patchValue({
          nom: '',
          prenom: '',
          email: '',
          password: '',
          tel: ''
        });
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'employé :', error);
        this.errorMessage = "Erreur lors de la mise à jour de l'employé";
        this.successMessage = '';
      }
    );
  }
}
