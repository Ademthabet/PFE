import { Component, OnInit } from '@angular/core';
import { DemandeMaterielService } from '../demande-materiel.service';
import { LigneDemandeMateriel, LigneDemandeService } from '../ligne-demande.service';
import { Materiel, MaterielService } from 'src/app/rm/materiel.service';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
import { PhotoService } from 'src/app/rm/photo.service';

@Component({
  selector: 'app-modifier-dem',
  templateUrl: './updateDemande.component.html',
  styleUrls: ['./updateDemande.component.scss']
})
export class ModifierDemComponent implements OnInit {
  demandes: any[] = [];
  demandesFiltrees: any[] = [];
  dateDemande: Date | undefined;
  etatDemande: string | undefined;
  demandeSelectionnee: any | undefined;
  lignesDemande: any[] = [];
  numeroLigne: number = 1;
  tableRows: any[] = [];
  ligneEnEdition: number | null = null;
  materiels: Materiel[] = [];
  ligneEnEditionBackup: any | null = null;
  nom: string = '';
  prenom: string = '';
  imagePath: string = '';
  id: any = 0;
  photos: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(
    private demandeMaterielService: DemandeMaterielService,
    private ligneDemandeService: LigneDemandeService,
    private materielService: MaterielService,
    private employeService: CreerCompteService,
    private photoService: PhotoService,
  ) { }
  ngOnInit(): void {
    this.addRow();
    this.getMateriels();
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
            this.imagePath = this.photos[0].nom; // Assuming 'nom' contains the filename/path
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
  addRow(): void {
    const newNumero = this.lignesDemande.length + 1;
    this.lignesDemande.push({
      numero: newNumero,
      designation: '',
      description: '',
      type: '',
      quantiteDem: '',
      materiels_id: 0
    });
  }
  removeRow(index: number): void {
    console.log('Ligne à supprimer : ', index);
    if (this.lignesDemande.length > 1) {
      console.log('Ligne : ', this.lignesDemande);
      console.log('Ligne : ', this.lignesDemande.length - 1);
      const ligneToDelete = this.lignesDemande[index];
      console.log('Ligne à supprimer : ', ligneToDelete);
      if (ligneToDelete && ligneToDelete.id) {
        this.ligneDemandeService.deleteLigneDemande(ligneToDelete.id).subscribe({
          next: () => {
            console.log('Ligne de demande supprimée avec succès');
            this.lignesDemande.splice(index, 1);
            this.lignesDemande.forEach((ligne, i) => {
              ligne.numero = i + 1;
            });
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de la ligne de demande : ', error);
          }
        });
      } else {
        console.error('Impossible de supprimer la ligne de demande: ID non valide');
      }
      this.lignesDemande.splice(index, 1);
      this.lignesDemande.forEach((ligne, i) => {
        ligne.numero = i + 1;
      });
    }
  }
  editRow(index: number): void {
    this.ligneEnEdition = index;
    this.ligneEnEditionBackup = { ...this.lignesDemande[index] };
    const ligneEnEdition = this.lignesDemande[index];
    const selectedMateriel = this.materiels.find(materiel => materiel.designation === ligneEnEdition.designation);
    if (selectedMateriel) {
      ligneEnEdition.description = selectedMateriel.description;
      ligneEnEdition.type = selectedMateriel.type;
    }
  }
  cancelEdit(): void {
    if (this.ligneEnEditionBackup && this.ligneEnEdition !== null) {
      this.lignesDemande[this.ligneEnEdition] = { ...this.ligneEnEditionBackup };
      this.ligneEnEditionBackup = null;
    }
    this.ligneEnEdition = null;
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
  updateDescriptionAndType(row: LigneDemandeMateriel): void {
    const selectedMateriel = this.materiels.find(materiel => materiel.designation === row.designation);
    if (selectedMateriel) {
      row.description = selectedMateriel.description;
      row.type = selectedMateriel.type;
      row.materiels_id = selectedMateriel.id;
    }
  }
  saveRow(index: number): void {
    const ligneDemande = this.lignesDemande[index];
    if (ligneDemande.id == null) {
      const nouvelleLigne = new LigneDemandeMateriel();
      nouvelleLigne.numero = ligneDemande.numero;
      nouvelleLigne.quantiteDem = ligneDemande.quantiteDem;
      nouvelleLigne.etat = 'EnCours';
      nouvelleLigne.demandeMateriels_id = this.demandeSelectionnee.id;
      nouvelleLigne.materiels_id = ligneDemande.materiels_id;
      this.ligneDemandeService.createLignesDemandes(nouvelleLigne).subscribe({
        next: (response) => {
          console.log('New demand line created successfully: ', response);
          this.successMessage = 'Demande de matériels modifiée avec succès.';
        },
        error: (error) => {
          console.error('Error creating new demand line: ', error);
          console.error('Server validation errors: ', error.error.errors);
          this.errorMessage = 'Veuillez remplir tous les champs.';
        }
      });
    } else {
      this.ligneDemandeService.updateQuantiteAndMaterielId(ligneDemande.id, ligneDemande)
        .subscribe({
          next: (response) => {
            console.log('Demand line updated successfully: ', response);
          },
          error: (error) => {
            console.error('Error updating demand line: ', error);
          }
        });
    }
    this.ligneEnEdition = null;
  }
  isEditing(index: number): boolean {
    return this.ligneEnEdition === index;
  }
  valider(): void {
    this.lignesDemande.forEach(ligneDemande => {
      if (ligneDemande.id && this.isEditing(this.lignesDemande.indexOf(ligneDemande))) {
        this.ligneDemandeService.updateQuantiteAndMaterielId(ligneDemande.id, ligneDemande)
          .subscribe({
            next: (response) => {
              console.log('Ligne de demande mise à jour avec succès : ', response);
            },
            error: (error) => {
              console.error('Erreur lors de la mise à jour de la ligne de demande : ', error);
            }
          });
      }
    });
  }
}
