<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
    public function getAll(){
        $data = Departement::get();
        return response()->json($data, 200);
    }
    public function getMaxNumero()
    {
        $maxNumeroDemande = Departement::max('numero');
        $numero = $maxNumeroDemande + 1;
        return response()->json($numero);
    }
    public function create(Request $request){
        $data['numero'] = $request['numero'];
        $data['nom'] = $request['nom'];
        Departement::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
    }
    public function update(Request $request,$id){
        $data['numero'] = $request['numero'];
        $data['nom'] = $request['nom'];
        Departement::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }
      public function delete($id){
        $res = Departement::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }

}
