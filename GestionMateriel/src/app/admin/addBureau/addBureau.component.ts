import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BureauService } from '../bureau.service';
import { DepartementService } from '../departement.service';
import { PhotoService } from 'src/app/rm/photo.service';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
export class Departement {
  id!: number;
  numero!: number;
  nom!: string;
}
@Component({
  selector: 'app-ajouter-bur',
  templateUrl: './addBureau.component.html',
  styleUrls: ['./addBureau.component.scss']
})
export class AjouterBurComponent implements OnInit {


  bureauForm: FormGroup;
  departements: Departement[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  numeroMax: number = 0;
  nom: string = '';
  prenom: string = '';
  imagePath: string = '';
  photos: any[] = [];
  id: any = 0;
  constructor(private formBuilder: FormBuilder,
    private bureauService: BureauService,
    private employeServicee: CreerCompteService,
    private photoService: PhotoService,
  ) {
    this.bureauForm = this.formBuilder.group({
      numero: ['', Validators.required],
      departement_id: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.bureauService.getMaxNumero().subscribe((maxNumero: number) => {
      this.numeroMax = maxNumero;
      this.bureauForm.patchValue({ numero: maxNumero });
    });
    this.loadDepartements();
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
  loadDepartements(): void {
    this.bureauService.getAllDepartements().subscribe(
      (departements: Departement[]) => {
        this.departements = departements;
      },
      error => {
        console.error('Erreur lors du chargement des départements :', error);
      }
    );
  }
  annuler() {
    this.bureauForm.patchValue({ departement_id: '' });
    this.errorMessage = '';
    this.successMessage = "";
  }
  ajouterBureau(): void {
    if (this.bureauForm.valid) {
      const bureauData = this.bureauForm.value;
      this.bureauService.addBureau(bureauData).subscribe(
        () => {
          console.log('Bureau ajouté avec succès');
          this.successMessage = 'Bureau ajouté avec succès';
          this.errorMessage = '';
          this.bureauForm.patchValue({ departement_id: '' });
          this.bureauService.getMaxNumero().subscribe((maxNumero: number) => {
            this.numeroMax = maxNumero;
            this.bureauForm.patchValue({ numero: maxNumero });
          });
        },
        error => {
          console.error('Erreur lors de l\'ajout du bureau :', error);
          this.errorMessage = "Erreur lors de l'ajout du bureau";
          this.successMessage = '';
        }
      );
    } else {
      console.error('Formulaire invalide');
      this.errorMessage = "Veuillez remplir tous les champs";
    }
  }
  onDepartementSelectionChange(event: any): void {
    const departementId = event.target.value;
    this.bureauForm.patchValue({
      departement_id: departementId
    });
  }
}
