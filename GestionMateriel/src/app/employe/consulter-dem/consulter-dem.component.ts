import { Component, OnInit } from '@angular/core';
import { DemandeMaterielService } from '../demande-materiel.service';
import { LigneDemandeService } from '../ligne-demande.service';
import { CreerCompteService } from 'src/app/creer-compte/creer-compte.service';
import { PhotoService } from 'src/app/rm/photo.service';

@Component({
  selector: 'app-consulter-dem',
  templateUrl: './consulter-dem.component.html',
  styleUrls: ['./consulter-dem.component.scss']
})
export class ConsulterDemComponent implements OnInit {
  demandes: any[] = [];
  demandesFiltrees: any[] = [];
  dateDemande: Date | undefined;
  etatDemande: string | undefined;
  demandeSelectionnee: any | undefined;
  lignesDemande: any[] = [];
  nom: string = '';
  prenom: string = '';
  id: any = 0;
  photos: any[] = [];
  imagePath: string = '';
  constructor(private demandeMaterielService: DemandeMaterielService
    , private ligneDemandeService: LigneDemandeService,
    private employeService: CreerCompteService,
    private photoService: PhotoService,
  ) { }

  ngOnInit(): void {
    this.nom = this.employeService.getData('nom') || '';
    this.prenom = this.employeService.getData('prenom') || '';
    this.id = this.employeService.getData('id') || '';
    this.getDemandes(this.id);
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
  getDemandes(id: any): void {
    this.demandeMaterielService.getDemandesWithIdEmployes(id).subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.demandes)) {
          this.demandes = response.demandes;
          this.filtrerDemandes();
        } else {
          console.error('Invalid response: expected an array of demands, received:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching demands:', error);
      }
    });
  }
  filtrerDemandes(): void {
    this.demandesFiltrees = this.demandes.filter(demande =>
      (!this.dateDemande || this.isSameDate(new Date(demande.date), new Date(this.dateDemande))) &&
      (!this.etatDemande || demande.etat === this.etatDemande)
    );
  }
  isSameDate(date1: Date, date2: Date): boolean {
    return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
  }
  selectionnerDemande(demande: any): void {
    this.demandeSelectionnee = demande;
    this.ligneDemandeService.getLignesWithMateriels().subscribe({
      next: (lignesDemande: any[]) => {
        this.lignesDemande = lignesDemande.filter((ligne: any) => ligne.demandeMateriels_id === demande.id);
        console.log("Lignes : ", lignesDemande);
      },
      error: (error: any) => {
        console.error('Error fetching demand lines with materials:', error);
      }
    });
  }
}
