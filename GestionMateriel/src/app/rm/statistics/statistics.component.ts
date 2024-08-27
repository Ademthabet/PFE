import { Component, OnInit } from '@angular/core';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
import { PhotoService } from '../photo.service';
import { MaterielService } from '../materiel.service';
import { DemandeMaterielService } from 'src/app/employe/demande-materiel.service';
import { StatistiqueService } from '../statistique.service';

@Component({
  selector: 'app-historique',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class HistoriqueComponent implements OnInit {
  imagePath: string = '';
  photos: any[] = [];
  materials: any[] = [];
  demandes: any[] = [];
  id: any = 0;
  nom: string = '';
  prenom: string = '';
  statistiques: any;
  delaiAttentes: any[] = [];
  moisList: Array<{ value: number, label: string }> = [];
  selectedMois: number = 0;
  constructor(
    private employeService: CreerCompteService,
    private photoService: PhotoService,
    private materielService: MaterielService,
    private demandematerielService: DemandeMaterielService,
    private statistiqueService: StatistiqueService,
  ) { }

  ngOnInit(): void {
    this.nom = this.employeService.getData('nom') || '';
    this.prenom = this.employeService.getData('prenom') || '';
    this.id = this.employeService.getData("id") || '';
    this.getPhotos(this.id);
    this.selectedMois = new Date().getMonth() + 1;
    // this.getStatistiquesMensuelles(new Date().getMonth() + 1);
    this.getStatistiquesMensuelles(this.selectedMois);
    this.moisList = this.getMoisList();
  }
  getMoisList() {
    return [
      { value: 1, label: 'Janvier' },
      { value: 2, label: 'Février' },
      { value: 3, label: 'Mars' },
      { value: 4, label: 'Avril' },
      { value: 5, label: 'Mai' },
      { value: 6, label: 'Juin' },
      { value: 7, label: 'Juillet' },
      { value: 8, label: 'Août' },
      { value: 9, label: 'Septembre' },
      { value: 10, label: 'Octobre' },
      { value: 11, label: 'Novembre' },
      { value: 12, label: 'Décembre' }
    ];
  }
  onMoisChange(event: any): void {
    const selectedMois = event.target.value;
    this.getStatistiquesMensuelles(selectedMois);
  }
  getStatistiquesMensuelles(mois: number): void {
    this.statistiqueService.getStatistiquesMensuelles(mois).subscribe(
      data => {
        this.statistiques = data.statistiques;
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques', error);
      }
    );
    this.statistiqueService.délaiAttenteDemandes(mois).subscribe(
      data => {
        this.delaiAttentes = data.delaiAttenteDemandes;
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques', error);
      }
    );
    this.statistiqueService.getNombreMatérielsParEmploye(mois).subscribe(data => {
      if (data.success) {
        this.materials = data.materiels;
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
  // this.statistiqueService.getStatistiquesMensuelles().subscribe(
  //   data => {
  //     this.statistiques = data.statistiques;
  //   },
  //   error => {
  //     console.error('Erreur lors de la récupération des statistiques', error);
  //   }
  // );
  // this.statistiqueService.délaiAttenteDemandes().subscribe(
  //   data => {
  //     this.delaiAttentes = data.delaiAttenteDemandes;
  //   },
  //   error => {
  //     console.error('Erreur lors de la récupération des statistiques', error);
  //   }
  // );
  // this.statistiqueService.getNombreMatérielsParEmploye().subscribe(data => {
  //   if (data.success) {
  //     this.materials = data.materiels;
  //   }
  // });  
}
