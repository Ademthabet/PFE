<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;

class EmployeController extends Controller
{    
    public function details($id)
    {
        try {
            $employe = Employe::join('bureaus', 'employes.bureaus_id', '=', 'bureaus.id')
                ->join('departements', 'bureaus.departement_id', '=', 'departements.id')
                ->select('employes.*', 'bureaus.numero as bureau_numero', 'departements.nom as departement_nom')
                ->findOrFail($id);
            return response()->json([
                'employe' => $employe,
                'bureau' => [
                    'numero' => $employe->bureau_numero,
                    'departement_nom' => $employe->departement_nom
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Une erreur s\'est produite lors de la récupération des détails de l\'employé.'], 500);
        }
    }
    public function updateEmploye(Request $request, $id)
    {
        $employe = Employe::findOrFail($id);
        if ($request->has('nom')) {
            $employe->nom = $request->nom;
        }
        if ($request->has('prenom')) {
            $employe->prenom = $request->prenom;
        }
        if ($request->has('email')) {
            $employe->email = $request->email;
        }
        if ($request->has('password')) {
            $employe->password = $request->password;
        }
        if ($request->has('tel')) {
            $employe->tel = $request->tel;
        }
        $employe->save();
        return response()->json(['message' => 'Employé mis à jour avec succès']);
    }
    public function addEmploye(Request $request){
        $existingEmployee = Employe::where('code', $request['code'])
                                    ->orWhere('email', $request['email'])
                                    ->first();
        if ($existingEmployee) {
            return response()->json([
                'message' => "Le code ou l'email existe déjà.",
                'success' => false
            ], 400);
        }
        $data['code'] = $request['code'];
        $data['nom'] = $request['nom'];
        $data['prenom'] = $request['prenom'];
        $data['dateRecrutement'] = $request['dateRecrutement'];
        $data['email'] = $request['email'];
        $data['password'] = $request['password'];
        $data['tel'] = $request['tel'];
        $data['role'] = $request['role'];
        Employe::create($data);
        return response()->json([
            'message' => "Employé créé avec succès.",
            'success' => true
        ], 200);
    }
    public function getAll(){
        $data = Employe::get();
        return response()->json($data, 200);
    }
    public function update(Request $request,$id){
        $data['code'] = $request['code'];
        $data['nom'] = $request['nom'];
        $data['prenom'] = $request['prenom'];
        $data['dateRecrutement'] = $request['dateRecrutement'];
        $data['email'] = $request['email'];
        $data['password'] = $request['password'];
        $data['tel'] = $request['tel'];
        $data['role'] = $request['role'];
        Employe::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }
      public function rechercherParEmailEtMotDePasse(Request $request)
      {
          $request->validate([
              'email' => 'required|email',
              'password' => 'required',
          ]);
          $employe = Employe::where('email', $request->email)
              ->where('password', $request->password)
              ->first();
          if ($employe) {
              return response()->json([
                  'exists' => true,
                  'role' => $employe->role,
                  'prenom' => $employe->prenom,
                  'nom' => $employe->nom,
                  'id' => $employe->id,
              ]);
          } else {
              return response()->json([
                  'exists' => false,
              ]);
          }
      }
      public function rechercherParEmail(Request $request)
      {
          $request->validate([
              'email' => 'required|email',
          ]);
          $email = $request->input('email');
          $employe = Employe::where('email', $email)->first();
          if ($employe) {
              return response()->json(['exists' => true], 200);
          } else {
              return response()->json(['exists' => false], 200); 
          }
      }
      public function updateByEmail(Request $request) {
        $email = $request->input('email');
        $employe = Employe::where('email', $email)->first();
        if ($employe) {
            $employe->nom = $request->input('nom');
            $employe->prenom = $request->input('prenom');
            $employe->password = $request->input('password');
            $employe->tel = $request->input('tel');
            $employe->save();
            return response()->json([
                'message' => 'Employé mis à jour avec succès',
                'success' => true
            ], 200);
        } else {
            return response()->json([
                'message' => "L'employé avec cet e-mail n'existe pas.",
                'success' => false
            ], 404);
        }
    }
    public function updateEmployeAff(Request $request, $id)
    {
        $employe = Employe::find($id);
        if (!$employe) {
            return response()->json(['message' => 'Employe not found'], 404);
        }
        $employe->fill($request->all());
        $employe->save();

        return response()->json($employe, 200);
    }

}
