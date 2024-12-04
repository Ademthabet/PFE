<?php

namespace App\Http\Controllers;

use App\Models\Mois;
use Illuminate\Http\Request;
use App\Models\DemandeMateriel;
use App\Models\Statistiques;
use App\Models\Employe;
use Illuminate\Support\Facades\DB;

class StatistiquesController extends Controller
{
    public function enregistrerStatistiquesMensuelles(Request $request)
    {
        // Récupérer le mois en cours ou le mois fourni
        $moisEnCours = $request->input('mois', date('n'));
        $dateDuJour = date('Y-m-d');

         // Récupérer les statistiques actuelles
        $nombreDemandesValidées = DemandeMateriel::where('etat', 'Validée')
                                                ->whereMonth('date', $moisEnCours)
                                                ->count();
        $nombreDemandesNonValidées = DemandeMateriel::where('etat', 'Non Validée')
                                                ->whereMonth('date', $moisEnCours)
                                                ->count();
        $nbrDPartiellementValidee = DemandeMateriel::where('etat', 'Partiellement Validée')
                                                ->whereMonth('date', $moisEnCours)
                                                ->count();
        $nombreDemandesEnCours = DemandeMateriel::where('etat', 'EnCours')
                                                ->whereMonth('date', $moisEnCours)
                                                ->count();
        $delaisAttente = DemandeMateriel::where('etat', 'Validée')
            ->whereMonth('date', $moisEnCours)
            ->join('date_validations', 'demande_materiels.id', '=', 'date_validations.demandeMateriels_id')
            ->select(DB::raw('DATEDIFF(date_validations.dateValidation, demande_materiels.date) as delai'))
            ->get();

        $dureeAttMoyenne = $delaisAttente->avg('delai');
         // Formater le délai d'attente moyen avec 3 chiffres après la virgule
         $dureeAttMoyenne = number_format($dureeAttMoyenne, 3); // Formater le délai d'attente moyen avec 3 chiffres après la virgule

        // Vérifier si des statistiques existent déjà pour le mois en cours
        $statistiquesExistantes = Statistiques::whereHas('mois', function ($query) use ($moisEnCours) {
            $query->where('numero', $moisEnCours);
        })->first();

        if ($statistiquesExistantes) {
            // Mettre à jour les statistiques existantes
            $statistiquesExistantes->update([
                'nbrDValidee' => $nombreDemandesValidées,
                'nbrDNonValidee' => $nombreDemandesNonValidées,
                'nbrDPartiellementValidee' => $nbrDPartiellementValidee,
                'nbrDEnCours' => $nombreDemandesEnCours,
                'dureeAttDemande' => $dateDuJour,
                'dureeAttMoyenne' => $dureeAttMoyenne,
                'nbrMParEmploye' => 0,
            ]);
        } else {
            // Créer de nouvelles statistiques
            $statistiques = Statistiques::create([
                'nbrDValidee' => $nombreDemandesValidées,
                'nbrDNonValidee' => $nombreDemandesNonValidées,
                'nbrDPartiellementValidee' => $nbrDPartiellementValidee,
                'nbrDEnCours' => $nombreDemandesEnCours,
                'dureeAttDemande' => $dateDuJour,
                'dureeAttMoyenne' => $dureeAttMoyenne,
                'nbrMParEmploye' => 0,
            ]);
            Mois::create([
                'numero' => $moisEnCours,
                'statistiques_id' => $statistiques->id,
            ]);
        }
        $statistiquesData = [
            'nbrDValidee' => $nombreDemandesValidées,
            'nbrDNonValidee' => $nombreDemandesNonValidées,
            'nbrDPartiellementValidee' => $nbrDPartiellementValidee,
            'nbrDEnCours' => $nombreDemandesEnCours,
            'dureeAttDemande' => $dateDuJour,
            'dureeAttMoyenne' => $dureeAttMoyenne,
            'nbrMParEmploye' => null,
        ];

        return response()->json([
            'success' => true,
            'message' => 'Les statistiques mensuelles ont été enregistrées avec succès',
            'statistiques' => $statistiquesData
        ]);
    }

    public function délaiAttenteDemandes(Request $request)
    {
        $moisEnCours = $request->input('mois', date('n'));

            $delaiAttenteDemandes= DemandeMateriel::join('date_validations', 'demande_materiels.id', '=', 'date_validations.demandeMateriels_id')
                                                ->join('employes','employes.id','=','demande_materiels.employe_id')
                                                ->where('etat', 'Validée')
                                                ->whereMonth('demande_materiels.date', $moisEnCours)
                                                ->select('demande_materiels.numero','demande_materiels.date','employes.prenom','employes.nom',
                                                DB::raw('DATEDIFF(date_validations.dateValidation, demande_materiels.date) as delai'))
                                                ->get();

        return response()->json([
            'success' => true,
            'delaiAttenteDemandes' => $delaiAttenteDemandes
        ]);
    }

    public function getNombreMatérielsParEmploye(Request $request)
    {
        $moisEnCours = $request->input('mois', date('n'));
                $nb=Employe::join('demande_materiels','demande_materiels.employe_id','=','employes.id')
                    ->join('ligne_demandes', 'demande_materiels.id', '=', 'ligne_demandes.demandeMateriels_id')
                    ->where('ligne_demandes.etat', 'Validée')
                    ->whereMonth('demande_materiels.date', $moisEnCours)
                    ->groupBy('employes.id', 'employes.prenom', 'employes.nom')
                    ->select('employes.prenom','employes.nom',DB::raw('SUM(ligne_demandes.quantiteDem) as totalQuantite'))
                    ->get();

        return response()->json([
            'success' => true,
            'materiels' => $nb
        ]);
    }
}
