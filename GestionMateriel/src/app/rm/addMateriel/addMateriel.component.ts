import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Materiel, MaterielService } from '../materiel.service';
import { Photo, PhotoService } from '../photo.service';
import { HttpClient } from '@angular/common/http';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';

@Component({
  selector: 'app-ajouter-m',
  templateUrl: './addMateriel.component.html',
  styleUrls: ['./addMateriel.component.scss']
})
export class AjouterMComponent implements OnInit {

  uploadForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  selectedFile: File | null = null;
  imagePath: string = '';
  photos: any[] = [];
  id: any = 0;
  nom: string = '';
  prenom: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private employeService: CreerCompteService,
  ) {
    this.uploadForm = this.formBuilder.group({
      code: ['', Validators.required],
      designation: ['', Validators.required],
      description: ['', Validators.required],
      quantite: ['', Validators.required],
      type: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.nom = this.employeService.getData('nom') || '';
    this.prenom = this.employeService.getData('prenom') || '';
    this.id = this.employeService.getData("id") || '';
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
  onSelectPhoto(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  onSubmit() {
    if (this.uploadForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs du formulaire.';
      return;
    }
    const formData = new FormData();
    formData.append('code', this.uploadForm.get('code')?.value ?? '');
    formData.append('designation', this.uploadForm.get('designation')?.value ?? '');
    formData.append('description', this.uploadForm.get('description')?.value ?? '');
    formData.append('quantite', this.uploadForm.get('quantite')?.value ?? '');
    formData.append('type', this.uploadForm.get('type')?.value ?? '');
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.photoService.uploadPhoto(formData).subscribe(
      (response) => {
        this.successMessage = 'Matériel ajouté avec succès';
        this.errorMessage = '';
        this.uploadForm.reset();
      },
      (error) => {
        this.successMessage = '';
        this.errorMessage = 'Erreur lors du téléchargement de la photo.';
      }
    );
  }
  annuler(): void {
    this.uploadForm.reset();
    this.errorMessage = "";
    this.successMessage = "";
  }
}


