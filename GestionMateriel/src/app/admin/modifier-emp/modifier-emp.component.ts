import { Component, OnInit } from '@angular/core';
import { Employe, EmployeService } from '../employe.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreerCompteService } from 'src/app/creer-compte/creer-compte.service';
import { PhotoService } from 'src/app/rm/photo.service';

@Component({
  selector: 'app-modifier-emp',
  templateUrl: './modifier-emp.component.html',
  styleUrls: ['./modifier-emp.component.scss']
})
export class ModifierEmpComponent implements OnInit {
  employeForm: FormGroup
  selectedEmployeEmail: string="" ;
  employes: Employe[] = [];
  selectedEmploye: Employe | undefined;
  selectedEmployeCode: number | undefined;
  successMessage: string = '';
  errorMessage: string = '';
  roles: string[] = ['Employé', 'Responsable matériels', 'Admin'];
  nom: string = '';
  prenom: string = '';
  imagePath:string='';
  photos: any[] = [];
  id:any=0;
  constructor(
    private employeService: EmployeService,
    public formBuilder: FormBuilder,
    private employeServicee: CreerCompteService,
    private photoService :PhotoService,
    ) {
    this.employeForm = this.formBuilder.group({
      code: [''],
      email: [''],
      dateRecrutement: [''],
      role: [''],
    })
  }
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
  getEmployes(): void {
    this.employeService.getEmployes().subscribe({
      next: (data: any) => {
        this.employes = data;
      },
      error: (error: any) => {
        console.error('Error fetching departments:', error);
      }
    });
  }
  ngOnInit(): void {
    this.nom = this.employeServicee.getData('nom') || '';
    this.prenom = this.employeServicee.getData('prenom') || '';
    this.id = this.employeServicee.getData('id') || '';
    this.getEmployes();
    this.getPhotos(this.id)
  }
  search(): void {
    if (!this.selectedEmployeEmail) {
      console.error('Selected employe number is invalid');
      return;
    }
    const selectedNumber = String(this.selectedEmployeEmail);
    this.selectedEmploye = this.employes.find(employe => employe.email === selectedNumber);

    if (!this.selectedEmploye) {
      console.error('employe not found');
      return;
    }
    this.employeForm.patchValue({
      code: this.selectedEmploye.code,
      email: this.selectedEmploye.email,
      dateRecrutement: this.selectedEmploye.dateRecrutement,
      role: this.selectedEmploye.role
    });
  }
  updateEmploye(): void {
    if (!this.employeForm.valid) {
        this.errorMessage = "Veuillez remplir tous les champs du formulaire.";
        return;
    }
    const updatedEmployeData: Employe = {
        id: this.selectedEmploye!.id,
        code: this.employeForm.value.code,
        email: this.employeForm.value.email,
        dateRecrutement: this.employeForm.value.dateRecrutement,
        role: this.employeForm.value.role
    };
    const codeExists = this.employes.some(employe => employe.code === updatedEmployeData.code && employe.id !== updatedEmployeData.id);
    const emailExists = this.employes.some(employe => employe.email === updatedEmployeData.email && employe.id !== updatedEmployeData.id);

    if (codeExists || emailExists) {
        this.errorMessage = "Le code ou l'email existe déjà.";
        return;
    }
    this.employeService.updateEmploye(this.selectedEmploye!.id, updatedEmployeData).subscribe(
        () => {
            console.log('Employé mis à jour avec succès');
            this.successMessage = 'Employé mis à jour avec succès';
            this.errorMessage = '';
            this.employeForm.reset();
            this.getEmployes();
        },
        error => {
            console.error('Erreur lors de la mise à jour de l\'employé :', error);
            this.errorMessage = "Erreur lors de la mise à jour de l'employé";
            this.successMessage = '';
        }
    );
}
  resetForm(): void {
    this.employeForm.reset();
    this.selectedEmploye = undefined;
    this.selectedEmployeEmail = '';
    this.successMessage = '';
    this.errorMessage = '';
  }
}
