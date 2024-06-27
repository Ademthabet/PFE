import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employe, EmployeService } from 'src/app/admin/employe.service';
import { CreerCompteService } from 'src/app/creer-compte/creer-compte.service';
import { PhotoService } from 'src/app/rm/photo.service';
@Component({
  selector: 'app-ajouter-emp',
  templateUrl: './ajouter-emp.component.html',
  styleUrls: ['./ajouter-emp.component.scss']
})
export class AjouterEmpComponent implements OnInit {
  code: string = '';
  email: string = '';
  dateRecrutement: Date = new Date();
  id: number = 0;
  role: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  nom: string = '';
  prenom: string = '';
  codeMaxEmploye: string = "";
  imagePath:string='';
  photos: any[] = [];
  idEmploye:any=0;
  constructor(
    private employeService: EmployeService,
    private employeServicee: CreerCompteService,
    private photoService :PhotoService,
  ) { }
  getPhotos(id: any): void {
    this.photoService.getPhotosByEmployeeId(id).subscribe({
      next: (response: any) => {
        if (response && response.success && Array.isArray(response.photos)) {
          this.photos = response.photos;
          console.log('Fetched Photos:', this.photos);
          if (this.photos.length > 0) {
            this.imagePath =  this.photos[0].nom; 
            console.log('Image Path:', this.imagePath);
          }
        } else {
          console.error('Invalid response or no photos found:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching photos:', error);
      }
    });
  }
  addEmployee(): void {
    if (!this.code || !this.email || !this.dateRecrutement || !this.role) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }
    const newEmployee: Employe = {
      id: this.id,
      code: this.code,
      email: this.email,
      dateRecrutement: this.dateRecrutement,
      role: this.role
    };
    this.employeService.addEmployeeee(newEmployee).subscribe(
      () => {
        console.log('Employé ajouté avec succès');
        this.successMessage = 'Employé ajouté avec succès';
        this.errorMessage = '';
        this.code = '';
        this.email = '';
        this.dateRecrutement = new Date();
        this.role = '';
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'employé :', error);
        this.errorMessage = "Le code ou l'email existe déjà.";
        this.successMessage = '';
      }
    );
  }
  resetForm(): void {
    this.code = '';
    this.email = '';
    this.dateRecrutement = new Date();
    this.role = '';
    this.successMessage="";
    this.errorMessage="";
  }
  ngOnInit(): void {
    this.nom = this.employeServicee.getData('nom') || '';
    this.prenom = this.employeServicee.getData('prenom') || '';
    this.idEmploye = this.employeServicee.getData('id') || '';
    this.getPhotos(this.idEmploye)
  }
}
