import { Component, OnInit } from '@angular/core';
import { Bureau, BureauService } from '../bureau.service';
import { Departement } from '../departement.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreerCompteService } from 'src/app/creer-compte/creer-compte.service';
import { PhotoService } from 'src/app/rm/photo.service';

@Component({
  selector: 'app-modifier-bur',
  templateUrl: './modifier-bur.component.html',
  styleUrls: ['./modifier-bur.component.scss']
})
export class ModifierBurComponent implements OnInit {
  bureauForm: FormGroup
  bureaus: Bureau[] = [];
  selectedBureauNumero: number | null = null;
  selectedBureau: Bureau | undefined;
  departements: Departement[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  nom: string = '';
  prenom: string = '';
  imagePath: string = '';
  photos: any[] = [];
  id:any=0;
  selectedBureauDepartementId: number | undefined;
  constructor(
    private bureauService: BureauService,
    public formBuilder: FormBuilder,
    private employeServicee: CreerCompteService,
    private photoService :PhotoService,
  ) {
    this.bureauForm = this.formBuilder.group({
      numero: [''],
      departement_id: [''],
    })
  }
  ngOnInit(): void {
    this.getBureaus();
    this.loadDepartements()
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
  getBureaus(): void {
    this.bureauService.getBureaus().subscribe({
      next: (data: any) => {
        this.bureaus = data;
      },
      error: (error: any) => {
        console.error('Error fetching departments:', error);
      }
    });
  }
  loadDepartements(): void {
    this.bureauService.getAllDepartements().subscribe({
      next: (data: Departement[]) => {
        this.departements = data;
      },
      error: (error: any) => {
        console.error('Error fetching departments:', error);
      }
    });
  }
  search(): void {
    if (!this.selectedBureauNumero) {
      console.error('Selected bureau number is invalid');
      return;
    }
    const selectedNumber = Number(this.selectedBureauNumero);
    this.selectedBureau = this.bureaus.find(bureau => bureau.numero === selectedNumber);

    if (!this.selectedBureau) {
      console.error('Bureau not found');
      return;
    }
    this.selectedBureauDepartementId = this.selectedBureau.departement_id;
    this.bureauForm.patchValue({
      numero: this.selectedBureau.numero,
      departement_id: this.selectedBureau.departement_id
    });
  }
  updateSelectedDepartementId(event: any): void {
    this.selectedBureauDepartementId = event.target.value;
  }
  annuler() {
    this.bureauForm.reset();
    this.selectedBureauNumero = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
  modifierBureau(): void {
    if (this.bureauForm.valid && this.selectedBureau) {
      const bureauData = {
        id: this.selectedBureau.id,
        numero: this.bureauForm.get('numero')?.value,
        departement_id: this.selectedBureauDepartementId 
      };
      this.bureauService.updateBureau(bureauData.id, bureauData).subscribe(
        () => {
          console.log('Bureau modifié avec succès');
          this.successMessage = 'Bureau mis à jour avec succès';
          this.errorMessage = '';
          this.bureauForm.reset();
          this.selectedBureauNumero = null;
          this.getBureaus();
          this.loadDepartements();
        },
        error => {
          console.error('Erreur lors de la modification du bureau :', error);
          this.errorMessage = "Le numéro de bureau existe déjà.";
          this.successMessage = '';
        }
      );
    } else {
      console.error('Formulaire invalide ou bureau non sélectionné');
      this.errorMessage = "Veuillez remplir tous les champs";
    }
  }
}
