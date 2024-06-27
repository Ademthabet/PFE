<?php

namespace App\Http\Controllers;

use App\Models\LigneDemande;
use Illuminate\Http\Request;

class LigneDemandeController extends Controller
{
    public function createLigneDemande(Request $request){
        $request->validate([
            'quantiteDem' => 'required|integer|gt:0'
        ]);
        LigneDemande::create($request->all());
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
      }
      public function getLignesWithMateriels()
      {
          $lignedemande = LigneDemande::join('materiels', 'ligne_demandes.materiels_id', '=', 'materiels.id')
                                      ->select('ligne_demandes.*','materiels.code', 'materiels.designation', 'materiels.description', 'materiels.type', 'materiels.quantite')
                                      ->get();
          return response()->json($lignedemande);
      }
      public function deleteLigneDemande($id)
      {
          $res = LigneDemande::find($id)->delete();
          return response()->json([
              'message' => "Successfully deleted",
              'success' => true
          ], 200);
      }
      public function store(Request $request)
      {
          $request->validate([
              'numero' => 'required',
              'quantiteDem' => 'required',
              'etat' => 'required',
              'demandeMateriels_id' => 'required|exists:demande_materiels,id',
              'materiels_id' => 'required|exists:materiels,id',
          ]);
          $ligneDemande = new LigneDemande();
          $ligneDemande->numero = $request->input('numero');
          $ligneDemande->quantiteDem = $request->input('quantiteDem');
          $ligneDemande->etat = $request->input('etat');
          $ligneDemande->demandeMateriels_id = $request->input('demandeMateriels_id');
          $ligneDemande->materiels_id = $request->input('materiels_id');
          $ligneDemande->save();
          return response()->json([
              'message' => "Successfully created",
              'success' => true
          ], 200);
      }
      public function updateQuantiteAndMaterielId(Request $request, $id)
    {
        $ligneDemande = LigneDemande::findOrFail($id);
        $ligneDemande->quantiteDem = $request->input('quantiteDem');
        $ligneDemande->materiels_id = $request->input('materiels_id');
        $ligneDemande->save();
        return response()->json(['message' => 'Quantité et ID du matériel mis à jour avec succès'], 200);
    }
    public function modifierEtatLigne(Request $request, $id)
    {
        $ligneDemande = LigneDemande::findOrFail($id);
        $request->validate([
            'nouvelEtat' => 'required|string',
        ]);
        $ligneDemande->etat = $request->nouvelEtat;
        $ligneDemande->save();

        return response()->json(['message' => 'État de la ligne de demande modifié avec succès'], 200);
    }
    public function updateStockQuantity(Request $request, $id)
    {
        $request->validate([
            'quantite' => 'required'
        ]);
        $ligneDemande = LigneDemande::findOrFail($id);
        $ligneDemande->materiels->decreaseQuantity($request->input('quantite'));
        return response()->json(['message' => 'Quantité en stock mise à jour avec succès'], 200);
    }
}
