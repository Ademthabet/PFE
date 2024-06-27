import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Materiel, MaterielService } from '../materiel.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreerCompteService } from 'src/app/creer-compte/creer-compte.service';

@Component({
  selector: 'app-modifier-m',
  templateUrl: './modifier-m.component.html',
  styleUrls: ['./modifier-m.component.scss']
})
export class ModifierMComponent implements OnInit {
  materielForm: FormGroup
  materiels: Materiel[] = [];
  selectedMaterielId: number | null = null;
  selectedMaterielDesignation: string = '';
  selectedMateriel: Materiel | undefined;
  code: string = '';
  designation: string = '';
  description: string = '';
  quantite: string = '';
  type: string = '';
  photo: string = '';
  nouvelle_photo: string = '';
  imageUrl: string = "";
  types: string[] = ['Informatique', ' Bureautique'];
  successMessage: string = '';
  errorMessage: string = '';
  imagePath: string = '';
  photoMaterielPath: string = '';
  photos: any[] = [];
  id: any = 0;
  nom: string = '';
  prenom: string = '';
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
    this.getMateriel();
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
  getMateriel(): void {
    this.materielService.getMateriels().subscribe({
      next: (data: any) => {
        this.materiels = data;
      },
      error: (error: any) => {
        console.error('Error fetching departments:', error);
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
      console.error('Selected bureau number is invalid');
      return;
    }
    this.getPhotosByMaterielId(this.selectedMaterielId);
    const selectedNumber = Number(this.selectedMaterielId);
    this.selectedMateriel = this.materiels.find(bureau => bureau.id === selectedNumber);

    if (!this.selectedMateriel) {
      console.error('Bureau not found');
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
  updateMateriel(): void {
    if (!this.selectedMateriel || !this.materielForm.valid) {
      console.error('Invalid employe or form data');
      this.errorMessage = 'Veuillez sélectionner le matériel et remplir le champ de quantité.'
      return;
    }
    const updatedMaterielData: Materiel = {
      id: this.selectedMateriel.id,
      code: this.materielForm.value.code,
      designation: this.materielForm.value.designation,
      description: this.materielForm.value.description,
      quantite: this.materielForm.value.quantite,
      type: this.materielForm.value.type,

    };
    this.photoService.updatePhotoMateriel(this.selectedMateriel.id, updatedMaterielData).subscribe(
      () => {
        console.log('Matériel mis à jour avec succès');
        this.successMessage = 'La Quantite de matériel mis à jour avec succès';
        this.errorMessage = '';
        this.materielForm.reset();
        this.selectedMateriel = undefined;
        this.selectedMaterielId = null;
        this.photoMaterielPath = '';
        this.getMateriel();
      },
      error => {
        console.error('Erreur lors de la mise à jour de matériel :', error);
        this.errorMessage = "Erreur lors de la mise à jour de l'matériel";
        this.successMessage = '';
      }
    );
  }
}
