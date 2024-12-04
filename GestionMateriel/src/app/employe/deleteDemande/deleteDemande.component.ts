import { Component, OnInit } from '@angular/core';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
import { DemandeMaterielService } from '../demande-materiel.service';
import { LigneDemandeService } from '../ligne-demande.service';
import { PhotoService } from 'src/app/rm/photo.service';

@Component({
  selector: 'app-supp-dem',
  templateUrl: './deleteDemande.component.html',
  styleUrls: ['./deleteDemande.component.scss']
})
export class SuppDemComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  demandes: any[] = [];
  demandesFiltrees: any[] = [];
  dateDemande: Date | undefined;
  etatDemande: string | undefined;
  demandeSelectionnee: any | undefined;
  lignesDemande: any[] = [];
  imagePath: string = '';
  id: any = 0;
  photos: any[] = [];
  photoPath: string = '';
  private isDeleteConfirmed: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  constructor(
    private employeService: CreerCompteService,
    private demandeMaterielService: DemandeMaterielService,
    private ligneDemandeService: LigneDemandeService,
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
    const etat = 'EnCours';
    this.demandeMaterielService.getDemandesWithIdEmploye(id, etat).subscribe({
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
      },
      error: (error: any) => {
        console.error('Error fetching demand lines with materials:', error);
      }
    });
  }
  annuler(): void {
    this.demandeSelectionnee = undefined;
    this.successMessage = '';
    this.errorMessage = '';
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
    this.supprimerDemandeEtLignes();
  }
  supprimerDemandeEtLignes(): void {
    if (this.demandeSelectionnee && this.demandeSelectionnee.id) {
      if (!this.isDeleteConfirmed) {
        this.openModal();
        return;
      }
      const demandeId = this.demandeSelectionnee.id;
      this.demandeMaterielService.deleteDemandeAndLignes(demandeId).subscribe({
        next: () => {
          console.log('Demande et ses lignes supprimées avec succès');
          this.demandeSelectionnee = undefined;
          this.lignesDemande = [];
          this.getDemandes(this.id);
          this.isDeleteConfirmed = false;
          this.successMessage = 'Demande supprimée avec succès.'
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la demande et de ses lignes : ', error);
          this.isDeleteConfirmed = false;
          this.errorMessage = 'Erreur lors de la suppression de la demande et de ses lignes.'
        }
      });
    } else {
      console.error('Impossible de supprimer la demande et ses lignes : ID de demande non valide');
    }
  }
}
