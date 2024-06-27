import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { CreerCompteService } from 'src/app/creer-compte/creer-compte.service';
import { DemandeMaterielService } from 'src/app/employe/demande-materiel.service';
import { LigneDemandeService } from 'src/app/employe/ligne-demande.service';
import { PhotoService } from '../photo.service';
import { DateValidationService } from '../date-validation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-validation-dem',
  templateUrl: './validation-dem.component.html',
  styleUrls: ['./validation-dem.component.scss'],
})
export class ValidationDemComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  demandes: any[] = [];
  demandesFiltrees: any[] = [];
  dateDemande: Date | undefined;
  etatDemande: string | undefined;
  demandeSelectionnee: any | undefined;
  lignesDemande: any[] = [];
  imagePath: string = '';
  photos: any[] = [];
  id: any = 0;
  constructor(
    private employeService: CreerCompteService,
    private demandeMaterielService: DemandeMaterielService,
    private ligneDemandeService: LigneDemandeService,
    private photoService: PhotoService,
    private dateValidationService: DateValidationService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.nom = this.employeService.getData('nom') || '';
    this.prenom = this.employeService.getData('prenom') || '';
    this.id = this.employeService.getData("id") || '';
    this.getPhotos(this.id);
    this.getDemandesWithEmploye();
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
  getDemandesWithEmploye(): void {
    this.demandeMaterielService.getDemandesWithEmployes().subscribe({
      next: (data: any[]) => {
        this.demandes = data;
        this.filtrerDemandes();
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
        this.lignesDemande = lignesDemande.filter((ligne: any) => ligne && ligne.demandeMateriels_id === demande.id);
      },
      error: (error: any) => {
        console.error('Error fetching demand lines with materials:', error);
      }
    });
  }
  annuler(): void {
    this.selectionnerDemande(null);
  }
  saveValidationDate(dateValidation: Date, employeId: number, demandeMaterielsId: number): void {
    const formattedDate = this.datePipe.transform(dateValidation, 'yyyy-MM-dd');
    const data = {
      dateValidation: formattedDate,
      employe_id: employeId,
      demandeMateriels_id: demandeMaterielsId
    };
    this.dateValidationService.createDateValidation(data).subscribe({
      next: (response: any) => {
        console.log('Date validation saved successfully:', response);
      },
      error: (error: any) => {
        console.error('Error saving date validation:', error);
      }
    });
  }
  validerDemandes(): void {
    let allValidated = true;
    let allNotValidated = true;
    const currentDate = new Date();
    this.lignesDemande.forEach((ligne, index, array) => {
      this.ligneDemandeService.modifierEtatLigne(ligne.id, ligne.newEtat).subscribe({
        next: (response: any) => {
          console.log('État de la ligne modifié avec succès');
          if (ligne.newEtat === 'Validée') {
            this.ligneDemandeService.updateStockQuantity(ligne.id, ligne.quantiteDem).subscribe({
              next: () => {
                // localStorage.setItem(`validationDate_${ligne.id}`, currentDate);
                console.log('Quantité en stock mise à jour avec succès dans la base de données');
                ligne.materiels.decreaseQuantity(ligne.quantiteDem);
              },
              error: (error: any) => {
                console.error('Erreur lors de la mise à jour de la quantité en stock dans la base de données:', error);
              }
            });

          }
          if (index === array.length - 1) {
            array.forEach(l => {
              if (l.newEtat !== 'Validée') {
                allValidated = false;
              }
              if (l.newEtat !== 'Non Validée') {
                allNotValidated = false;
              }
            });
            let overallStatus = '';
            if (allValidated) {
              overallStatus = 'Validée';
            } else if (allNotValidated) {
              overallStatus = 'Non Validée';
            } else {
              overallStatus = 'Partiellement Validée';
            }
            this.demandeMaterielService.updateDemandeEtat(this.demandeSelectionnee.id, overallStatus).subscribe({
              next: () => {
                console.log('Statut de la demande mis à jour avec succès');
                // localStorage.setItem(`validationDate_${this.demandeSelectionnee.id}`, currentDate);
                this.saveValidationDate(currentDate, this.id, this.demandeSelectionnee.id);
                this.selectionnerDemande(null);
                this.getDemandesWithEmploye();
              },
              error: (error: any) => {
                console.error('Erreur lors de la mise à jour du statut de la demande :', error);
              }
            });
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la modification de l\'état de la ligne:', error);
        }
      });
    });
  }
}
