<?php

namespace App\Http\Controllers;

use App\Models\Bureau;
use App\Models\DemandeMateriel;
use App\Models\Employe;
use App\Models\Materiel;
use Illuminate\Support\Facades\DB;
use App\Models\Photo;
use Illuminate\Http\Request;

class MaterielController extends Controller
{
    public function getAll(){ 
        $data = Materiel::get();
        return response()->json($data, 200);
    }
    public function getValidatedMateriels($employeId)
    {
        $employe = Employe::findOrFail($employeId);
        $validatedMateriels = DemandeMateriel::where('demande_materiels.employe_id', $employe->id)
            ->join('ligne_demandes', 'demande_materiels.id', '=', 'ligne_demandes.demandeMateriels_id')
            ->where('ligne_demandes.etat', 'Validée')
            ->join('materiels', 'ligne_demandes.materiels_id', '=', 'materiels.id')
            ->selectRaw('materiels.designation, materiels.description, materiels.type, SUM(ligne_demandes.quantiteDem) as quantiteDem')
            ->groupBy('materiels.designation', 'materiels.description', 'materiels.type')
            ->get();

        return response()->json([
            'success' => true,
            'materiels' => $validatedMateriels
        ]);
    }
    public function updateMaterielAff(Request $request, $id)
    {
        $materiel = Materiel::find($id);
        if (!$materiel) {
            return response()->json(['message' => 'Materiel not found'], 404);
        }
        $materiel->fill($request->only(['code', 'designation', 'description', 'type', 'quantite']));
        if ($request->has('employe_id')) {
            $materiel->employe_id = $request->employe_id;
        }
        if ($request->has('bureaus_id')) {
            $materiel->bureaus_id = $request->bureaus_id;
        }
        $materiel->save();
        return response()->json($materiel, 200);
    }
    public function getMaterielsByEmployeId($id)
    {
        $employe = Employe::findOrFail($id);
        $materiels= DemandeMateriel::where('demande_materiels.employe_id', $employe->id)
                                    ->join('ligne_demandes', 'demande_materiels.id', '=', 'ligne_demandes.demandeMateriels_id')
                                    ->where('ligne_demandes.etat', 'Validée')
                                    ->join('materiels', 'ligne_demandes.materiels_id', '=', 'materiels.id')
                                    ->selectRaw('materiels.designation, materiels.description, materiels.type, SUM(ligne_demandes.quantiteDem) as quantiteDem')
                                    ->groupBy('materiels.designation', 'materiels.description', 'materiels.type')
                                    ->get();

        return response()->json([
            'success' => true,
            'materiels' => $materiels
        ]);
    }

}
