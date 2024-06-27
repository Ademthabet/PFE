import { Component, OnInit } from '@angular/core';
import { CreerCompteService } from '../creer-compte/creer-compte.service';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-rm',
  templateUrl: './rm.component.html',
  styleUrls: ['./rm.component.scss']
})
export class RmComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  imagePath:string='';
  photos: any[] = [];
  id:any=0;
  constructor(
    private employeService: CreerCompteService,
    private photoService: PhotoService,
  ) {
  }

  ngOnInit(): void {
    this.nom = this.employeService.getData('nom') || '';
    this.prenom = this.employeService.getData('prenom') || '';
    this.id=this.employeService.getData( "id" ) || '';
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
}
