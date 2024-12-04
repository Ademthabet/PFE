import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Materiel, MaterielService } from '../materiel.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';

@Component({
  selector: 'app-supp-m',
  templateUrl: './deleteMateriel.component.html',
  styleUrls: ['./deleteMateriel.component.scss']
})
export class SuppMComponent implements OnInit {
  materielForm: FormGroup
  materiels: Materiel[] = [];
  selectedMaterielId: number | null = null;
  selectedMateriel: Materiel | undefined;
  successMessage: string = '';
  errorMessage: string = '';
  types: string[] = ['Informatique', ' Bureautique'];
  imagePath: string = '';
  photos: any[] = [];
  id: any = 0;
  nom: string = '';
  prenom: string = '';
  photoMaterielPath: string = '';
  private isDeleteConfirmed: boolean = false;
  constructor(
    private photoService: PhotoService,
    private materielService: MaterielService,
    public formBuilder: FormBuilder,
    private employeService: CreerCompteService,
  ) {
    this.materielForm = this.formBuilder.group({
      code: [''],
      designation: [''],
      description: [''],
      quantite: [''],
      type: [''],
      nouvelle_photo: [''],
    })
  }
  ngOnInit(): void {
    this.nom = this.employeService.getData('nom') || '';
    this.prenom = this.employeService.getData('prenom') || '';
    this.id = this.employeService.getData("id") || '';
    this.getPhotos(this.id);
    this.getMateriels();
    this.getPhotosByMaterielId(this.selectedMateriel?.id)
  }
  getPhotosByMaterielId(id: any): void {
    this.photoService.getPhotosByMaterielId(id).subscribe({
      next: (response: any) => {
        if (response && response.success && Array.isArray(response.photos)) {
          this.photos = response.photos;
          console.log('Fetched Photos:', this.photos);
          if (this.photos.length > 0) {
            this.photoMaterielPath = this.photos[0].nom;
            console.log('Image Path:', this.photoMaterielPath);
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
  getMateriels(): void {
    this.materielService.getMateriels().subscribe({
      next: (data: any) => {
        this.materiels = data;
      },
      error: (error: any) => {
        console.error('Error fetching matériels:', error);
      }
    });
  }
  resetForm(): void {
    this.materielForm.reset();
    this.selectedMateriel = undefined;
    this.selectedMaterielId = null;
    this.successMessage = '';
    this.errorMessage = '';
    this.photoMaterielPath = '';
  }
  search(): void {
    if (!this.selectedMaterielId) {
      console.error('Selected matériel number is invalid');
      return;
    }
    this.getPhotosByMaterielId(this.selectedMaterielId);
    const selectedNumber = Number(this.selectedMaterielId);
    this.selectedMateriel = this.materiels.find(bureau => bureau.id === selectedNumber);

    if (!this.selectedMateriel) {
      console.error('matériel not found');
      return;
    }
    this.materielForm.patchValue({
      code: this.selectedMateriel.code,
      designation: this.selectedMateriel.designation,
      description: this.selectedMateriel.description,
      quantite: this.selectedMateriel.quantite,
      type: this.selectedMateriel.type
    });
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
    this.supprimerMateriel();
  }
  supprimerMateriel(): void {
    if (!this.selectedMateriel) {
      console.error('Invalid employe or form data');
      this.errorMessage = 'Veuillez sélectionner un matériel.'
      return;
    }
    if (this.selectedMateriel) {
      if (!this.isDeleteConfirmed) {
        this.openModal();
        return;
      }
      this.photoService.deletePhotoAndMaterialByMaterielId(this.selectedMateriel.id).subscribe(
        () => {
          console.log('Matériel supprimé avec succès');
          this.successMessage = 'Matériel et son photo supprimé avec succès';
          this.errorMessage = '';
          this.materielForm.reset();
          this.photoMaterielPath = '';
          this.getMateriels();
          this.isDeleteConfirmed = false;
        },
        error => {
          console.error('Erreur lors de la suppression du Matériel :', error);
          this.errorMessage = "Erreur lors de la suppression du Matériel";
          this.successMessage = '';
          this.isDeleteConfirmed = false;
        }
      );
    } else {
      console.error('Matériel non sélectionné');
    }
  }
}
