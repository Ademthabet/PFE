import { Component, OnInit } from '@angular/core';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
import { MaterielService } from 'src/app/rm/materiel.service';
import { PhotoService } from 'src/app/rm/photo.service';

@Component({
  selector: 'app-consulter-mat',
  templateUrl: './consultMateriel.component.html',
  styleUrls: ['./consultMateriel.component.scss']
})
export class ConsulterMatComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  id: any = 0;
  photos: any[] = [];
  imagePath: string = '';
  materiels: any[] = [];
  constructor(
    private employeService: CreerCompteService,
    private photoService: PhotoService,
    private materielService: MaterielService,
  ) { }

  ngOnInit(): void {
    this.nom = this.employeService.getData('nom') || '';
    this.prenom = this.employeService.getData('prenom') || '';
    this.id = this.employeService.getData('id') || '';
    this.getPhotos(this.id)
    this.getValidatedMateriels(this.id);
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
  getValidatedMateriels(id: any): void {
    this.materielService.getValidatedMaterielsByEmployeeId(id).subscribe({
      next: (response: any) => {
        if (response && response.success && Array.isArray(response.materiels)) {
          this.materiels = response.materiels;
          console.log('Fetched Materiels:', this.materiels);
        } else {
          console.error('Invalid response or no materiels found:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching materiels:', error);
      }
    });
  }
}
