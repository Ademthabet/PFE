<?php

namespace App\Http\Controllers;

use App\Models\DemandeMateriel;
use App\Models\Employe;
use App\Models\LigneDemande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class DemandeMatérielController extends Controller
{     
    public function getMaxNumeroDemande($employeId)
    {
        $maxNumeroDemande = DemandeMateriel::where('employe_id', $employeId)->max('numero');
        $numero = $maxNumeroDemande + 1;
        return response()->json($numero);
    }
    public function createDemandeMateriel(Request $request)
    {
        $request->validate([
            'numero' => 'required',
            'date' => 'required|date',
            'etat' => 'required',
            'employe_id' => 'required|exists:employes,id'
        ]);
        $demande = new DemandeMateriel();
        $demande->numero = $request->input('numero');
        $demande->date = $request->input('date');
        $demande->etat = $request->input('etat');
        $demande->employe_id = $request->input('employe_id');
        $demande->save();
        return response()->json(['demande_id' => $demande->id], 201);
    }
    public function getDemandesParIdEmployes($idEmploye)
    {
        $demandes = DemandeMateriel::where('employe_id', $idEmploye)->get();
        if ($demandes->isEmpty()) {
            return response()->json(['message' => 'Aucune demande trouvée pour cet employé.'], 404);
        }
        return response()->json(['demandes' => $demandes], 200);
    }
    public function getDemandesParIdEmploye($id, $etat)
    {
        $demandes = DemandeMateriel::where('employe_id', $id)
                                    ->where('etat', $etat)
                                    ->get();

        return response()->json(['demandes' => $demandes], 200);
    }
    public function deleteDemandeAndLignes($id)
    {
        DemandeMateriel::destroy($id);
        LigneDemande::where('demandeMateriels_id', $id)->delete();
        return response()->json([
            'message' => "La demande et ses lignes ont été supprimées avec succès",
            'success' => true
        ], 200);
    }
    public function getDemandesWithEmployes()
    {
        $demandeMateriel = DemandeMateriel::join('employes', 'demande_materiels.employe_id', '=', 'employes.id')
                                    ->where('etat','EnCours')
                                    ->orWhere('etat','Partiellement Validée')
                                    ->select('demande_materiels.*', 'employes.prenom', 'employes.nom')
                                    ->get();
        return response()->json($demandeMateriel);
    }
    public function updateDemandeEtat(Request $request, $demandeId)
    {
        $validatedData = $request->validate([
            'etat' => 'required'
        ]);

        $demande = DemandeMateriel::findOrFail($demandeId);
        $demande->etat = $validatedData['etat'];
        $demande->save();

        return response()->json(['success' => true, 'message' => 'Demand status updated successfully'], 200);
    }
}
