import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Materiel, MaterielService } from '../materiel.service';
import { Employe, EmployeService } from 'src/app/employe/employe.service';
import { Bureau, BureauService } from 'src/app/admin/bureau.service';
import { Departement, DepartementService } from 'src/app/admin/departement.service';
import { PhotoService } from '../photo.service';
import { CreerCompteService } from 'src/app/createAccount/creer-compte.service';
// import { Departement, DepartementService } from 'src/app/admin/departement.service';

@Component({
  selector: 'app-affectation-m',
  templateUrl: './affectMateriel.component.html',
  styleUrls: ['./affectMateriel.component.scss']
})
export class AffectationMComponent implements OnInit {
  employes: Employe[] = [];
  tableRowsEmploye: any[] = [];
  imagePath: string = '';
  photos: any[] = [];
  id: any = 0;
  nom: string = '';
  prenom: string = '';
  materiels: any[] = [];
  bureau: any = {};
  departement: any = {};
  constructor(
    private materielService: MaterielService,
    private employeService: EmployeService,
    private bureauService: BureauService,
    private photoService: PhotoService,
    private employeServiceee: CreerCompteService,
  ) { }

  ngOnInit(): void {
    this.nom = this.employeServiceee.getData('nom') || '';
    this.prenom = this.employeServiceee.getData('prenom') || '';
    this.id = this.employeServiceee.getData("id") || '';
    this.getPhotos(this.id);
    this.getEmploye();
    this.addRowEmploye();
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

  getEmploye(): void {
    this.employeService.getEmployes().subscribe({
      next: (data: any) => {
        this.employes = data;
      },
      error: (error: any) => {
        console.error('Error fetching departments:', error);
      }
    });
  }
  updatePrenomAndRole(rows: any): void {
    const selectedMateriel = this.employes.find(employe => employe.nom === rows.nom);
    if (selectedMateriel) {
      rows.prenom = selectedMateriel.prenom;
      rows.role = selectedMateriel.role;
      this.getMateriels(selectedMateriel.id);
      this.getBureauByEmployeId(selectedMateriel.id)
    }
  }
  getMateriels(id: any): void {
    this.materielService.getMaterielsByEmployeId(id).subscribe({
      next: (response: any) => {
        if (response && response.success && Array.isArray(response.materiels)) {
          this.materiels = response.materiels;
        } else {
          console.error('Invalid response or no materiels found:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching materiels:', error);
      }
    });
  }
  getBureauByEmployeId(id: any): void {
    this.bureauService.getBureauByEmployeId(id).subscribe({
      next: (response: any) => {
        if (response && response.success) {
          this.bureau = response.bureau;
          this.departement = response.departement;
        } else {
          console.error('Invalid response or no bureau details found:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching bureau details:', error);
      }
    });
  }




























  // getMateriel(): void {
  //   this.materielService.getMateriels().subscribe({
  //     next: (data: any) => {
  //       this.materiels = data;
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching departments:', error);
  //     }
  //   });
  // }
  // getBureauxWithDepartments(): void {
  //   this.bureauService.getBureauxWithDepartments().subscribe({
  //     next: (data: any) => {
  //       this.bureaux = data;
  //       console.log(this.bureaux)
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching departments:', error);
  //     }
  //   });
  // }

  // updateDescriptionAndType(row: any): void {
  //   const selectedMateriel = this.materiels.find(materiel => materiel.designation === row.designation);
  //   if (selectedMateriel) {
  //     row.description = selectedMateriel.description;
  //     row.type = selectedMateriel.type;
  //   }
  // }

  // onSelectBureau(event: any, index: number) {
  //   const selectedBureauNumber = event.target.value;
  //   const selectedBureauDep = this.bureaux.find(bureau => bureau.numero == selectedBureauNumber);
  //   if (selectedBureauDep) {
  //     this.tableRowsBureaux[index].selectedBureau = selectedBureauDep.numero;
  //     this.selectedDepartmentNames[index] = selectedBureauDep.departements?.nom || '';
  //   }
  // }
  // addRowMateriel(): void {
  //   this.tableRowsMateriel.push({
  //     designation: '',
  //     description: '',
  //     type: ''
  //   });
  // }
  addRowEmploye(): void {
    this.tableRowsEmploye.push({
      nom: '',
      prenom: '',
      role: ''
    });
  }
  // addRowBureau(): void {
  //   this.tableRowsBureaux.push({
  //     numreo: '',
  //     departement: '',
  //   });
  // }
  // removeRowMateriel(index: number): void {
  //   if (index >= 0 && index < this.tableRowsMateriel.length) {
  //     this.tableRowsMateriel.splice(index, 1);
  //   }
  // }
  // removeRowEmploye(index: number): void {
  //   if (index >= 0 && index < this.tableRowsEmploye.length) {
  //     this.tableRowsEmploye.splice(index, 1);
  //   }
  // }
  // removeRowBureau(index: number): void {
  //   if (index >= 0 && index < this.tableRowsBureaux.length) {
  //     this.tableRowsBureaux.splice(index, 1);
  //     this.selectedDepartmentNames.splice(index, 1);
  //   }
  // }
  // resetSelects(): void {
  //   this.tableRowsBureaux.forEach(row => row.selectedBureau = '');
  //   this.tableRowsMateriel.forEach(row => {
  //     row.designation = '';
  //     row.description = ''; 
  //     row.type = '';
  //   });
  //   this.tableRowsEmploye.forEach(row => {
  //     row.nom = ''; 
  //     row.prenom = '';
  //     row.role = '';
  //   });
  //   this.selectedDepartmentNames = new Array(this.tableRowsBureaux.length).fill('');
  // }
  // valider(): void {
  //   this.tableRowsMateriel.forEach(rowMateriel => {
  //     if (rowMateriel.designation) {
  //       const selectedMateriel = this.materiels.find(materiel => materiel.designation == rowMateriel.designation);
  //       if (selectedMateriel) {
  //         this.tableRowsEmploye.forEach(rowEmploye => {
  //           if (rowEmploye.nom) {
  //             const empid = this.employes.find(employe => employe.nom == rowEmploye.nom)
  //             selectedMateriel.employe_id = empid?.id;
  //           }
  //         })
  //         this.tableRowsBureaux.forEach(rowBureau => {
  //           if (rowBureau.selectedBureau) {
  //             const bureauId = this.bureaux.find(bureau => bureau.numero == rowBureau.selectedBureau)
  //             selectedMateriel.bureaus_id = bureauId?.id;
  //           }
  //         })
  //         this.materielService.updateMaterielAff(selectedMateriel).subscribe({
  //           next: (response: any) => {
  //           },
  //           error: (error: any) => {
  //             console.error('Error updating materiel:', error);
  //           }
  //         });
  //       }
  //     }
  //   });
  //   this.tableRowsEmploye.forEach(rowEmploye => {
  //     if (rowEmploye.nom) {
  //       const selectedEmploye = this.employes.find(employe => employe.nom === rowEmploye.nom);
  //       if (selectedEmploye) {
  //         console.log(selectedEmploye)
  //         this.tableRowsBureaux.forEach(rowBureau => {
  //           if (rowBureau.selectedBureau) {
  //             const bureauId = this.bureaux.find(bureau => bureau.numero == rowBureau.selectedBureau)
  //             selectedEmploye.bureaus_id = bureauId?.id;
  //           }
  //         })
  //         this.employeService.updateEmployeAff(selectedEmploye).subscribe({
  //           next: (response: any) => {
  //             console.log('update employe')
  //             this.resetSelects();
  //           },
  //           error: (error: any) => {
  //             console.error('Error updating employe:', error);
  //           }
  //         });
  //       }
  //     }
  //   });

  //  }
}

