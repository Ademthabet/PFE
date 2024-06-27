<?php

namespace App\Console\Commands;

use App\Models\Mois;
use App\Models\Statistique;
use App\Models\DemandeMateriel;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class EnregistrerStatistiquesMensuelles extends Command
{
    protected $signature = 'statistiques:enregistrer';
    protected $description = 'Enregistre les statistiques mensuelles des demandes';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Récupérer le mois en cours
        $moisEnCours = date('n');

        // Récupérer les statistiques actuelles
        $nombreDemandesValidées = DemandeMateriel::where('etat', 'Validée')->count();
        $nombreDemandesNonValidées = DemandeMateriel::where('etat', 'Non Validée')->count();
        $nombreDemandesPartiellementValidées = DemandeMateriel::where('etat', 'Partiellement Validée')->count();
        $nombreDemandesEnCours = DemandeMateriel::where('etat', 'EnCours')->count();

        // Vérifier si des statistiques existent déjà pour le mois en cours
        $statistiquesExistantes = Statistique::whereHas('mois', function ($query) use ($moisEnCours) {
            $query->where('numero', $moisEnCours);
        })->first();

        if ($statistiquesExistantes) {
            // Mettre à jour les statistiques existantes
            $statistiquesExistantes->update([
                'nbrDValidee' => $nombreDemandesValidées,
                'nbrDNonValidee' => $nombreDemandesNonValidées,
                'nbrPartiellementValidee' => $nombreDemandesPartiellementValidées,
                'nbrDEnCours' => $nombreDemandesEnCours,
                'dureeAttDemande' => null,
                'dureeAttMoyenne' => null,
                'nbrMParEmploye' => null,
            ]);
            Log::info('Statistiques mises à jour pour le mois '.$moisEnCours);
        } else {
            // Créer de nouvelles statistiques avec les autres champs à null
            $statistiques = Statistique::create([
                'nbrDValidee' => $nombreDemandesValidées,
                'nbrDNonValidee' => $nombreDemandesNonValidées,
                'nbrPartiellementValidee' => $nombreDemandesPartiellementValidées,
                'nbrDEnCours' => $nombreDemandesEnCours,
                'dureeAttDemande' => null,
                'dureeAttMoyenne' => null,
                'nbrMParEmploye' => null,
            ]);

            // Associer le mois en cours aux statistiques
            Mois::create([
                'numero' => $moisEnCours,
                'statistiques_id' => $statistiques->id,
            ]);
            Log::info('Nouvelles statistiques créées pour le mois '.$moisEnCours);
        }

        $this->info('Les statistiques mensuelles ont été enregistrées avec succès.');
    }
}
