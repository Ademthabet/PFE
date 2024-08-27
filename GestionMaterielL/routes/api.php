<?php

use App\Models\LigneDemande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Statistiques;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\BureauController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\MaterielController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\LigneDemandeController;
use App\Http\Controllers\StatistiquesController;
use App\Http\Controllers\DateValidationController;
use App\Http\Controllers\DemandeMatérielController;
Route::prefix('departement')->group(function () {
    Route::get('/',[ DepartementController::class, 'getAll']);
    Route::get('/maxNumero',[ DepartementController::class, 'getMaxNumero']);
    Route::post('/',[ DepartementController::class, 'create' ]);
    Route::put('/{id}',[ DepartementController::class, 'update']);
    Route::delete('/{id}',[ DepartementController::class, 'delete']);
});
Route::prefix('bureau')->group(function () {
    Route::get('/maxNumero',[ BureauController::class, 'getMaxNumero']);
    Route::post('/',[ BureauController::class, 'store' ]);
    Route::get('/',[ BureauController::class, 'getAll']);
    Route::put('/{id}',[ BureauController::class, 'update']);
    Route::delete('/{id}',[ BureauController::class, 'delete']);
    Route::get('/bureaux',[ BureauController::class, 'getBureauxWithDepartments']);
    Route::get('/getBureauByEmployeId/{id}',[ BureauController::class, 'getBureauByEmployeId']);
});
Route::prefix('employe')->group(function () {
    Route::get('/details/{id}', [EmployeController::class, 'details']);
    /////update f blast create
    Route::put('/update/{id}',[ EmployeController::class, 'updateEmploye']);
    Route::post('/addEmploye',[ EmployeController::class, 'addEmploye']);
    Route::get('/',[ EmployeController::class, 'getAll']);
    Route::put('/{id}',[ EmployeController::class, 'update']);
    Route::get('/search',[ EmployeController::class, 'rechercherParEmailEtMotDePasse']);
    Route::get('/email',[ EmployeController::class, 'rechercherParEmail']);
    Route::put('/creation/{email}',[ EmployeController::class, 'updateByEmail']);
    Route::put('/updateEmployeAff/{id}',[ EmployeController::class, 'updateEmployeAff']);
});
Route::prefix('materiel')->group(function () {
    Route::get('/',[ MaterielController::class, 'getAll']);
    Route::get('/getValidatedMateriels/{id}',[ MaterielController::class, 'getValidatedMateriels']);
    Route::put('/updateMaterielAff/{id}',[ MaterielController::class, 'updateMaterielAff']);
    Route::get('/getMaterielsByEmployeId/{id}',[ MaterielController::class, 'getMaterielsByEmployeId']);
});
Route::prefix('photo')->group(function () {
    Route::get('/employe/{id}',[ PhotoController::class, 'getPhotosByEmployeId']);
    Route::post('/photoEmploye/{id}', [PhotoController::class, 'uploadPhotoEmploye']);
    Route::post('/',[ PhotoController::class, 'uploadPhoto']);
    Route::get('/materiel/{id}',[ PhotoController::class, 'getPhotosByMaterielId']);
    Route::put('/{id}',[ PhotoController::class, 'updatePhotoMateriel']);
    Route::delete('/deletePhotoAndMaterialByMaterielId/{id}',[ PhotoController::class, 'deletePhotoAndMaterialByMaterielId']);
});
Route::prefix('demandeMateriel')->group(function () {
    Route::get('/maxNumeroDemande/{id}',[ DemandeMatérielController::class, 'getMaxNumeroDemande']);
    Route::post('/',[ DemandeMatérielController::class, 'createDemandeMateriel' ]);
    Route::get('/getDemandesParIdEmploye/{id}',[ DemandeMatérielController::class, 'getDemandesParIdEmployes']);
    Route::get('/getDemandesParIdEmploye/{id}/{etat}',[ DemandeMatérielController::class, 'getDemandesParIdEmploye']);
    Route::delete('/{id}',[ DemandeMatérielController::class, 'deleteDemandeAndLignes']);
    Route::get('/demandesWithEmploye',[ DemandeMatérielController::class, 'getDemandesWithEmployes']);
    Route::put('/updateEtat/{id}',[ DemandeMatérielController::class, 'updateDemandeEtat']);
    Route::get('/getNombreDemandeValidée',[ DemandeMatérielController::class, 'getNombreDemandeValidée']);
    Route::get('/getNombreDemandeNonValidée',[ DemandeMatérielController::class, 'getNombreDemandeNonValidée']);
    Route::get('/getNombreDemandePartiellementValidée',[ DemandeMatérielController::class, 'getNombreDemandePartiellementValidée']);
    Route::get('/getNombreDemandeEnCours',[ DemandeMatérielController::class, 'getNombreDemandeEnCours']);
});
Route::prefix('ligneDemande')->group(function () { 
    Route::post('/',[ LigneDemandeController::class, 'createLigneDemande']);
    Route::get('/lignes',[ LigneDemandeController::class, 'getLignesWithMateriels']);
    Route::delete('/{id}',[ LigneDemandeController::class, 'deleteLigneDemande']);
    Route::post('/store',[ LigneDemandeController::class, 'store']);
    Route::put('/ligneDemande/{id}',[ LigneDemandeController::class, 'updateQuantiteAndMaterielId']);
    /////
    Route::put('/updateEtatLigne/{id}',[ LigneDemandeController::class, 'updateEtatLigne']);
    Route::put('/updateStockQuantity/{id}',[ LigneDemandeController::class, 'updateStockQuantity']);
});
Route::prefix('statistiques')->group(function () { 
    Route::get('/statistiquesmensuelles', [StatistiquesController::class, 'enregistrerStatistiquesMensuelles']);
    Route::get('/délaiAttenteDemandes', [StatistiquesController::class, 'délaiAttenteDemandes']);
    Route::get('/getNombreMatérielsParEmploye',[ StatistiquesController::class, 'getNombreMatérielsParEmploye']);
});
Route::prefix('dateValidation')->group(function () { 
    Route::post('/', [DateValidationController::class, 'store']);
});

