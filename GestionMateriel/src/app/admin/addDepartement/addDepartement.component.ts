import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartementService } from '../departement.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Observable } from 'rxjs';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
import { PhotoService } from 'src/app/rm/photo.service';
export class Departement {
  numero!: number;
  nom!: string;
}
@Component({
  selector: 'app-ajouter-dep',
  templateUrl: './addDepartement.component.html',
  styleUrls: ['./addDepartement.component.scss']
})
export class AjouterDepComponent implements OnInit {
  departementForm: FormGroup
  successMessage: string = '';
  errorMessage: string = '';
  numeroMax: number = 0;
  nom: string = '';
  prenom: string = '';
  imagePath: string = '';
  photos: any[] = [];
  id: any = 0;
  constructor(
    public formBuilder: FormBuilder,
    private departementService: DepartementService,
    private employeServicee: CreerCompteService,
    private photoService: PhotoService,
  ) {
    this.departementForm = this.formBuilder.group({
      numero: [''],
      nom: [''],
    })
  }
  ngOnInit(): void {
    this.departementService.getMaxNumero().subscribe((maxNumero: number) => {
      this.numeroMax = maxNumero;
      this.departementForm.patchValue({ numero: maxNumero });
    });
    this.nom = this.employeServicee.getData('nom') || '';
    this.prenom = this.employeServicee.getData('prenom') || '';
    this.id = this.employeServicee.getData('id') || '';
    this.getPhotos(this.id)
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
  ajouter(): void {
    if (!this.departementForm.value.nom) {
      this.errorMessage = "Veuillez remplir tous les champs";
      return;
    }
    this.departementService.addDepartement(this.departementForm.value).subscribe({
      next: (response) => {
        console.log('Département ajoutée avec succès:', response);
        this.successMessage = 'Département ajouté avec succès';
        this.errorMessage = '';
        this.departementForm.patchValue({ nom: '' });
        this.departementService.getMaxNumero().subscribe((maxNumero: number) => {
          this.numeroMax = maxNumero;
          this.departementForm.patchValue({ numero: maxNumero });
        });
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du département:", error);
        this.errorMessage = "Erreur lors de l'ajout du département";
        this.successMessage = '';
      }
    });
  }
  annuler(): void {
    this.departementForm.patchValue({ nom: '' });
    this.errorMessage = '';
    this.successMessage = "";
  }
}