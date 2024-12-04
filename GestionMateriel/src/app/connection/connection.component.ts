import { Component, OnInit } from '@angular/core';
import { CreerCompteService } from '../createAccount/creer-compte.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-connexion',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnexionComponent implements OnInit {
  email: string = '';
  password: string = '';
  id: number = 0;
  errorMessage: string = '';
  constructor(private employeService: CreerCompteService, private router: Router) { }
  ngOnInit(): void {
  }
  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    if (!email || !password) {
      console.log("Veuillez saisir une adresse email et un mot de passe.");
      this.errorMessage = "Veuillez saisir une adresse email et un mot de passe.";
      return;
    }
    this.employeService.rechercherEmployeParEmailEtPassword(email, password).subscribe((response: any) => {
      if (response.exists) {
        const role = response.role;
        const prenom = response.prenom;
        const nom = response.nom;
        const id = response.id;
        if (role === 'Admin') {
          this.employeService.saveData('prenom', prenom);
          this.employeService.saveData('nom', nom);
          this.employeService.saveData('id', id);
          this.employeService.saveData('role', role);
          this.router.navigate(['/admin']);
        } else if (role === 'Employé') {
          this.employeService.saveData('prenom', prenom);
          this.employeService.saveData('nom', nom);
          this.employeService.saveData('id', id);
          this.employeService.saveData('role', role);
          console.log("id", id);
          this.router.navigate(['/employe']);
        } else {
          this.router.navigate(['/rm']);
          this.employeService.saveData('prenom', prenom);
          this.employeService.saveData('nom', nom);
          this.employeService.saveData('id', id);
          this.employeService.saveData('role', role);
          console.log("id", id);
        }
      } else {
        console.log("L'email ou le mot de passe est incorrect");
        this.errorMessage = "L'email ou le mot de passe est incorrect"
      }
    });
  }
}