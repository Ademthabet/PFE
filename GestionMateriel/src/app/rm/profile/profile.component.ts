import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { CreerCompteService } from 'src/app/creer-compte/creer-compte.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imagePath:string='';
  photos: any[] = [];
  id:any=0;
  nom: string = '';
  prenom: string = '';
  role: string = '';
  employeForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  bureau: any;
  departement: any;
  selectedFile: File | null = null;
  constructor(
    private photoService: PhotoService,
    private employeService: CreerCompteService,
    public formBuilder: FormBuilder,
  ) { 
    this.employeForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: [''],
      tel: [''],
      bureau: [''],
      departement: ['']
    })
  }
  ngOnInit(): void {
    this.nom = this.employeService.getData('nom') || '';
    this.prenom = this.employeService.getData('prenom') || '';
    this.id=this.employeService.getData( "id" ) || '';
    this.role = this.employeService.getData('role') || '';
    this.getPhotos(this.id);
    this.employeService.getDetailsEmploye(this.id).subscribe(
      (data: any) => {
        this.bureau = data.bureau;
        this.departement = data.bureau.departement_nom;
      },
      error => {
        console.error('Erreur lors de la récupération des détails du bureau et du département :', error);
      }
    );
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
  modifierEmploye() {
    if (!this.employeForm.valid) {
      console.error('Formulaire invalide');
      return;
    }
    const updatedEmployeData = {
      id: this.id,
      nom: this.employeForm.value.nom,
      prenom: this.employeForm.value.prenom,
      email: this.employeForm.value.email,
      password: this.employeForm.value.password,
      tel: this.employeForm.value.tel
    };
    console.log(updatedEmployeData);
    this.employeService.modification(this.id, updatedEmployeData).subscribe(
      () => {
        console.log('Employé modifié avec succès');
        this.successMessage = 'Profil modifié avec succès';
        this.errorMessage = '';
        this.employeForm.reset();
        this.nom = updatedEmployeData.nom;
        this.prenom = updatedEmployeData.prenom;
        this.employeService.saveData('prenom', this.prenom);
        this.employeService.saveData('nom', this.nom);
      },
      error => {
        console.error('Erreur lors de la modification de l\'employé :', error);
        this.errorMessage = 'Veuillez remplir tous les champs.';
      }
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const formData = new FormData();
      formData.append('photo', file);
      this.photoService.uploadPhotoEmploye(this.id, formData).subscribe(
        (response: any) => {
          console.log('Photo uploaded successfully!', response);
          this.imagePath = response.path;
          localStorage.setItem('profileImage', this.imagePath);
        },
        (error: any) => {
          console.error('Error uploading photo:', error);
        }
      );
    }
  }
}
