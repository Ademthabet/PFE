import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
import { DemandeMaterielService } from '../demande-materiel.service';
import { LigneDemandeMateriel, LigneDemandeService } from '../ligne-demande.service';
import { Materiel, MaterielService } from 'src/app/rm/materiel.service';
import { PhotoService } from 'src/app/rm/photo.service';

@Component({
  selector: 'app-ajoute-dem',
  templateUrl: './addDemande.component.html',
  styleUrls: ['./addDemande.component.scss']
})
export class AjouteDemComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  id: any = 0;
  idEmploye: number = 0;
  dateAujourdhui: string = '';
  numeroMaxDemande: number = 0;
  materiels: Materiel[] = [];
  tableRows: any[] = [];
  numeroLigne: number = 1;
  selectedMateriel: Materiel | undefined;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  imagePath: string = '';
  photos: any[] = [];
  constructor(
    private employeService: CreerCompteService,
    private demandeMaterielService: DemandeMaterielService,
    private ligneDemandeService: LigneDemandeService,
    private materielService: MaterielService,
    private photoService: PhotoService,
  ) {

  }
  ngOnInit(): void {
    this.nom = this.employeService.getData('nom') || '';
    this.prenom = this.employeService.getData('prenom') || '';
    this.id = parseInt(this.employeService.getData('id') || '0');
    console.log(this.id);
    this.demandeMaterielService.getMaxNumeroDemande(this.id).subscribe((maxNumero: number) => {
      this.numeroMaxDemande = maxNumero;
    });
    let date = new Date();
    date.setHours(date.getHours() + 1);
    this.dateAujourdhui = date.toISOString().split('T')[0];
    this.getMateriels();
    this.addRow();
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
  getMateriels(): void {
    this.materielService.getMateriels().subscribe({
      next: (data: Materiel[]) => {
        this.materiels = data;
      },
      error: (error: any) => {
        console.error('Error fetching materials:', error);
      }
    });
  }
  updateDescriptionAndType(row: any): void {
    const selectedMateriel = this.materiels.find(materiel => materiel.designation === row.designation);
    if (selectedMateriel) {
      row.description = selectedMateriel.description;
      row.type = selectedMateriel.type;
      row.id = selectedMateriel.id;
    }
  }
  addRow(): void {
    this.numeroLigne + 1;
    this.tableRows.push({
      designation: '',
      description: '',
      type: '',
      quantite: '',
      materiels_id: 0
    });
  }
  removeRow(index: number) {
    if (this.tableRows.length > 1) {
      this.tableRows.splice(index, 1);
    }
  }
  ajouterDemande(): void {
    if (!this.nom || !this.prenom || this.tableRows.some(row => !row.designation || !row.quantiteDem)) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      this.successMessage = null;
      return;
    }
    const employeId = this.employeService.getData('id');
    const demandeMaterielData = {
      numero: this.numeroMaxDemande,
      date: this.dateAujourdhui,
      etat: 'EnCours',
      employe_id: employeId ? parseInt(employeId) : 0,
    };
    this.demandeMaterielService.createDemandeMateriel(demandeMaterielData).subscribe({
      next: (demandeMaterielId: any) => {
        let allLineItemsAdded = true;
        this.tableRows.forEach((row: any, index: number) => {
          if (!allLineItemsAdded) return;
          const ligneDemandeData = {
            numero: index + 1,
            quantiteDem: row.quantiteDem,
            etat: 'EnCours',
            demandeMateriels_id: demandeMaterielId.demande_id,
            materiels_id: row.id
          };
          this.ligneDemandeService.createLigneDemande(ligneDemandeData).subscribe({
            next: () => {
              this.successMessage = 'Demande de matériels ajoutée avec succès.';
              console.log('Ligne de demande ajoutée avec succès.');
            },
            error: () => {
              allLineItemsAdded = false;
              this.demandeMaterielService.deleteDemandeAndLignes(demandeMaterielId.demande_id).subscribe(() => {
                this.errorMessage = 'Erreur lors de l\'ajout des lignes de demande. Demande annulée.';
                this.successMessage = null;
                this.demandeMaterielService.getMaxNumeroDemande(this.id).subscribe((maxNumero: number) => {
                  this.numeroMaxDemande = maxNumero;
                });
              });
            }
          });
        });
        if (allLineItemsAdded) {
          this.successMessage = 'Demande de matériels ajoutée avec succès.';
          this.errorMessage = null;
          this.resetFields();
          this.demandeMaterielService.getMaxNumeroDemande(this.id).subscribe((maxNumero: number) => {
            this.numeroMaxDemande = maxNumero;
          });
        }
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l\'ajout de la demande de matériels.';
        this.successMessage = null;
      }
    });
  }
  // ajouterDemande(): void {
  //   if (!this.nom || !this.prenom || this.tableRows.some(row => !row.designation || !row.quantiteDem)) {
  //     this.errorMessage = 'Veuillez remplir tous les champs.';
  //     this.successMessage = null;
  //     return;
  //   }
  //   const employeId = this.employeService.getData('id');
  //   const demandeMaterielData = {
  //     numero: this.numeroMaxDemande,
  //     date: this.dateAujourdhui,
  //     etat: 'EnCours',
  //     employe_id: employeId ? parseInt(employeId) : 0,
  //   };
  //   this.demandeMaterielService.createDemandeMateriel(demandeMaterielData).subscribe((demandeMaterielId: any) => {
  //     this.tableRows.forEach((row: any, index: number) => {
  //       const ligneDemandeData = {
  //         numero: index + 1,
  //         quantiteDem: row.quantiteDem,
  //         etat: 'EnCours',
  //         demandeMateriels_id: demandeMaterielId.demande_id,
  //         materiels_id: row.id
  //       };
  //       this.ligneDemandeService.createLigneDemande(ligneDemandeData).subscribe(() => {
  //         console.log('Ligne de demande ajoutée avec succès.');
  //         this.successMessage = 'Demande de matériels ajoutée avec succès.';
  //         this.errorMessage = null;
  //         this.resetFields();
  //         this.demandeMaterielService.getMaxNumeroDemande(this.id).subscribe((maxNumero: number) => {
  //           this.numeroMaxDemande = maxNumero;
  //         });
  //         this.successMessage = 'Demande de matériels ajoutée avec succès.';
  //       }, error => {
  //         this.errorMessage = 'Erreur lors de l\'ajout des lignes de demande.';
  //         this.successMessage = null;
  //       }
  //       );
  //     });
  //   });
  // }
  resetFields(): void {
    this.tableRows.forEach(row => {
      row.designation = '';
      row.description = '';
      row.type = '';
      row.quantiteDem = '';
    });
    this.errorMessage = '';
    this.successMessage = '';
  }
}