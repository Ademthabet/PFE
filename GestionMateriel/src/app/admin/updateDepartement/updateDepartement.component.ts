import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../departement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
import { PhotoService } from 'src/app/rm/photo.service';
export class Departement {
  id!: number;
  numero!: number;
  nom!: string;
}
@Component({
  selector: 'app-modifier-dep',
  templateUrl: './updateDepartement.component.html',
  styleUrls: ['./updateDepartement.component.scss']
})
export class ModifierDepComponent implements OnInit {
  departementForm: FormGroup
  departements: Departement[] = [];
  selectedDepartement: Departement | undefined;
  selectedDepartementId: number | undefined;
  successMessage: string = '';
  errorMessage: string = '';
  nom: string = '';
  prenom: string = '';
  imagePath: string = '';
  photos: any[] = [];
  id: any = 0;
  constructor(private departementService: DepartementService,
    public formBuilder: FormBuilder,
    private employeServicee: CreerCompteService,
    private photoService: PhotoService,
  ) {
    this.departementForm = this.formBuilder.group({
      numero: [''],
      nom: [''],
    })
  }
  getDepartements(): void {
    this.departementService.getDepartements().subscribe({
      next: (data: any) => {
        this.departements = data;
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
    this.getDepartements();
    this.getPhotos(this.id);
  }
  getPhotos(id: any): void {
    this.photoService.getPhotosByEmployeeId(id).subscribe({
      next: (response: any) => {
        if (response && response.success && Array.isArray(response.photos)) {
          this.photos = response.photos;
          console.log('Fetched Photos:', this.photos);
          if (this.photos.length > 0) {
            this.imagePath = this.photos[0].nom;
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
  search(): void {
    if (!this.selectedDepartementId) {
      console.error('Selected departement number is invalid');
      return;
    }
    const selectedNumber = Number(this.selectedDepartementId);
    this.selectedDepartement = this.departements.find(departement => departement.numero === selectedNumber);

    if (!this.selectedDepartement) {
      console.error('Bureau not found');
      return;
    }
    this.departementForm.patchValue({
      numero: this.selectedDepartement.numero,
      nom: this.selectedDepartement.nom
    });
  }
  annuler() {
    this.departementForm.reset();
    this.errorMessage = "";
    this.successMessage = "";
    this.selectedDepartementId = 0;
  }
  modifierDepartement(): void {
    if (this.departementForm.valid && this.selectedDepartement) {
      const bureauData = this.departementForm.value;
      bureauData.id = this.selectedDepartement.id;
      const departementId = this.departementForm.get('departement_id')?.value;
      if (departementId !== null) {
        bureauData.departement_id = departementId;
        this.departementService.updateDepartement(bureauData.id, bureauData).subscribe(
          () => {
            console.log('Département modifié avec succès');
            this.successMessage = 'Département modifier avec succès.';
            this.errorMessage = '';
            this.departementForm.reset();
            this.getDepartements();
          },
          error => {
            console.error('Erreur lors de la modification du departement :', error)
            this.errorMessage = "Le numéro de département exist déja.";
            this.successMessage = '';
          }
        );
      } else {
        console.error('ID du département non sélectionné');
      }
    } else {
      console.error('Formulaire invalide ou departement non sélectionné');
      this.errorMessage = "Veuillez remplir tous les champs.";
    }
  }
}
