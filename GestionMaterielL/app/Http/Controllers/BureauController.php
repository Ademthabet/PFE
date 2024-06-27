<?php

namespace App\Http\Controllers;

use App\Models\Bureau;
use App\Models\Employe;
use App\Models\Departement;
use Illuminate\Http\Request;

class BureauController extends Controller
{
    public function getMaxNumero()
    {
        $maxNumeroDemande = Bureau::max('numero');
        $numero = $maxNumeroDemande + 1;
        return response()->json($numero);
    }
    public function store(Request $request){
        Bureau::create($request->all());
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
    }
      public function getAll(){
        $data = Bureau::get();
        return response()->json($data, 200);
    }
    public function update(Request $request, $id)
    {
        try {
            $bureau = Bureau::findOrFail($id);
            $existingBureau = Bureau::where('numero', $request->numero)->where('id', '!=', $id)->first();
            if ($existingBureau) {
                return response()->json([
                    'message' => "Le numéro de bureau existe déjà.",
                    'success' => false
                ], 409);
            }
            $bureau->update($request->all());
            return response()->json([
                'message' => "Bureau successfully updated",
                'success' => true
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error updating bureau: " . $e->getMessage(),
                'success' => false
            ], 500);
        }
    }
    public function delete($id){
        $res = Bureau::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }
      public function getBureauxWithDepartments()
      {
          $bureaux = Bureau::with('departements')->get();
          return response()->json($bureaux);
      }
      public function getBureauByEmployeId($id)
      {
          $employe = Employe::with(['bureaux.departements'])                
                            ->findOrFail($id);
          
          if (!$employe->bureaux) {
              return response()->json([
                  'success' => false,
                  'message' => 'Bureau not found'
              ]);
          }
      
          $bureau = $employe->bureaux;
          $departement = $bureau->departements;
      
          return response()->json([
              'success' => true,
              'bureau' => $bureau,
              'departement' => $departement
          ]);
      }
}
