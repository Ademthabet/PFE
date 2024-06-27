<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Employe extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'code'       => $this->code,
            'nom'        => $this->nom,
            'dateRecrutement'        => $this->dateRecrutement,
            'email'        => $this->email,
            'password'        => $this->password,
            'tel'     => (int) $this->tel,
            'role'        => $this->role,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
