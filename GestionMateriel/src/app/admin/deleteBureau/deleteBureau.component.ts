import { Component, OnInit } from '@angular/core';
import { Departement } from '../departement.service';
import { Bureau, BureauService } from '../bureau.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
import { PhotoService } from 'src/app/rm/photo.service';

@Component({
  selector: 'app-supp-bur',
  templateUrl: './deleteBureau.component.html',
  styleUrls: ['./deleteBureau.component.scss']
})
export class SuppBurComponent implements OnInit {
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
  id: any = 0;
  private isDeleteConfirmed: boolean = false;
  constructor(private bureauService: BureauService,
    public formBuilder: FormBuilder,
    private employeServicee: CreerCompteService,
    private photoService: PhotoService,
  ) {
    this.bureauForm = this.formBuilder.group({
      numero: [''],
      departement_id: [''],
    })
  }
  ngOnInit(): void {
    this.getBureaus();
    this.loadDepartements();
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
    this.bureauForm.patchValue({
      numero: this.selectedBureau.numero
    });
  }
  annuler() {
    this.bureauForm.reset();
    this.selectedBureauNumero = null;
    this.selectedBureau = undefined;
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
    this.supprimerBureau();
  }
  supprimerBureau(): void {
    if (this.selectedBureau) {
      if (!this.isDeleteConfirmed) {
        this.openModal();
        return;
      }
      this.bureauService.supprimerBureau(this.selectedBureau.id).subscribe(
        () => {
          console.log('Bureau supprimé avec succès');
          this.successMessage = 'Bureau supprimé avec succès';
          this.errorMessage = '';
          this.bureauForm.reset();
          this.selectedBureauNumero = null;
          this.getBureaus();
          this.isDeleteConfirmed = false;
        },
        error => {
          console.error('Erreur lors de la suppression du bureau :', error);
          this.errorMessage = "Erreur lors de la suppression du bureau";
          this.successMessage = '';
          this.isDeleteConfirmed = false;
        }
      );
    } else {
      console.error('Bureau non sélectionné');
      this.errorMessage = "Bureau non sélectionné";
    }
  }
}
