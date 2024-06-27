<?php

namespace App\Http\Controllers;

use App\Models\DateValidation;
use Illuminate\Http\Request;

class DateValidationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'dateValidation' => 'required|date',
            'employe_id' => 'required',
            'demandeMateriels_id' => 'required|integer',
        ]);

        DateValidation::create($request->all());

        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
    }
}
