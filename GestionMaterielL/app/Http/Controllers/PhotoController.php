<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Employe;
use App\Models\Materiel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class PhotoController extends Controller
{ 
    public function getPhotosByEmployeId($employe_id)
    {
        try {
            $photos = Photo::where('employe_id', $employe_id)->get();
            return response()->json(['success' => true, 'photos' => $photos], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching photos by employe_id: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error fetching photos'], 500);
        }
    }
    public function uploadPhotoEmploye(Request $request, $id)
    {
        try {
            if (!$request->hasFile('photo')) {
                return response()->json(['success' => false, 'message' => 'No file uploaded'], 400);
            }
            $photo = $request->file('photo');
            $imageName = time() . '.' . $photo->getClientOriginalExtension();
            $destinationPath = public_path('/images');
            $photo->move($destinationPath, $imageName);
            $photoEntry = Photo::where('employe_id', $id)->first();
            if ($photoEntry) {
                $oldImagePath = public_path('/images/' . $photoEntry->nom);
                if (File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }
                $photoEntry->update([
                    'nom' => $imageName,
                    'type' => $photo->getClientOriginalExtension()
                ]);
            } else {
                $photoEntry = Photo::create([
                    'nom' => $imageName,
                    'type' => $photo->getClientOriginalExtension(),
                    'employe_id' => $id,
                ]);
            }
            return response()->json(['success' => true, 'message' => 'File Uploaded Successfully', 'path' => $imageName], 200);
        } catch (\Exception $e) {
            Log::error('File upload error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error uploading the file'], 500);
        }
    }
    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'code' => 'required',
            'designation' => 'required',
            'description' => 'required',
            'quantite' => 'required',
            'type' => 'required',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $materiel = Materiel::create([
            'code' => $request->code,
            'designation' => $request->designation,
            'description' => $request->description,
            'quantite' => $request->quantite,
            'type' => $request->type,
        ]);
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('/images'), $imageName);

            Photo::create([
                'nom' => $imageName,
                'type' => $image->getClientOriginalExtension(),
                'materiel_id' => $materiel->id,
            ]);
        }
        return response()->json(['message' => 'Photo uploaded successfully'], 200);
    }
    public function getPhotosByMaterielId($materiel_id)
    {
        try {
            $photos = Photo::where('materiel_id', $materiel_id)->get();
            return response()->json(['success' => true, 'photos' => $photos], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching photos by employe_id: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error fetching photos'], 500);
        }
    }
    public function updatePhotoMateriel(Request $request, $id)
    {
        $materiel = Materiel::findOrFail($id);
        $materiel->code = $request->input('code');
        $materiel->designation = $request->input('designation');
        $materiel->description = $request->input('description');
        $materiel->quantite = $request->input('quantite');
        $materiel->type = $request->input('type');
        if ($request->hasFile('nouvelle_photo')) {
            $image = $request->file('nouvelle_photo');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('images'), $imageName);
            $materiel->photo = '/images/'.$imageName;
        }
        $materiel->save();
        return response()->json(['message' => 'Matériel modifié avec succès'], Response::HTTP_OK);
    }
    public function deletePhotoAndMaterialByMaterielId($materiel_id)
    {
        try {
            $photo = Photo::where('materiel_id', $materiel_id)->first();
            if (!$photo) {
                return response()->json(['success' => false, 'message' => 'Photo not found for the given materiel ID'], 404);
            }
            Storage::delete('images/' . $photo->nom);
            Materiel::where('id', $materiel_id)->delete();
            $photo->delete();
            return response()->json(['success' => true, 'message' => 'Photo and associated material deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting photo and associated material by materiel ID: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error deleting photo and associated material'], 500);
        }
    }

}
