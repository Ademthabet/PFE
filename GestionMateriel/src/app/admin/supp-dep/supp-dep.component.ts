import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../departement.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreerCompteService } from 'src/app/creer-compte/creer-compte.service';
import { PhotoService } from 'src/app/rm/photo.service';
export class Departement {
  id!: number;
  numero!: number;
  nom!: string;
}
@Component({
  selector: 'app-supp-dep',
  templateUrl: './supp-dep.component.html',
  styleUrls: ['./supp-dep.component.scss']
})
export class SuppDepComponent implements OnInit {
  departementForm: FormGroup
  departements: Departement[] = [];
  selectedDepartement: Departement | undefined;
  selectedDepartementId: number | undefined;
  selectedDepartementNom: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  nom: string = '';
  prenom: string = '';
  imagePath:string='';
  photos: any[] = [];
  id:any=0;
  private isDeleteConfirmed: boolean = false;
  constructor(private departementService: DepartementService,
    public formBuilder: FormBuilder,
    private employeServicee: CreerCompteService,
    private photoService :PhotoService,
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
    this.getDepartements();
    this.nom = this.employeServicee.getData('nom') || '';
    this.prenom = this.employeServicee.getData('prenom') || '';
    this.id = this.employeServicee.getData('id') || '';
    this.getPhotos(this.id);
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
  search(): void {
    if (!this.selectedDepartementId) {
      console.error('Selected departement number is invalid');
      return;
    }
    const selectedNumber = Number(this.selectedDepartementId);
    this.selectedDepartement = this.departements.find(departement => departement.numero === selectedNumber);

    if (!this.selectedDepartement) {
      console.error('departement not found');
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
  openModal(): void {
    const modal = document.getElementById("confirmationModal");
    if (modal) {
      modal.style.display = "block";
    }
  }

  closeModal(): void {
    const modal = document.getElementById("confirmationModal");
    if (modal) {
      modal.style.display = "none";
    }
  }

  confirmDelete(): void {
    this.isDeleteConfirmed = true;
    this.closeModal();
    this.supprimerDepartement();
  }
  supprimerDepartement(): void {
    if (this.departementForm.valid && this.selectedDepartement) {
      if (!this.isDeleteConfirmed) {
        this.openModal();
        return;
      }
      this.departementService.deleteDepartement(this.selectedDepartement.id).subscribe(
        () => {
          console.log('Département supprimé avec succès');
          this.successMessage = 'Département supprimé avec succès';
          this.errorMessage = '';
          this.departementForm.reset();
          this.getDepartements();
          this.isDeleteConfirmed = false;
        },
        error => {
          console.error('Erreur lors de la suppression du Département :', error);
          this.errorMessage = "Erreur lors de la suppression du Département";
          this.successMessage = '';
          this.isDeleteConfirmed = false;
        }
      );
    } else {
      console.error('Département non sélectionné');
      this.errorMessage = "Veuillez remplir tous les champs.";
    }
  }
}
