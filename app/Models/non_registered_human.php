<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class non_registered_human extends Model
{
    use HasFactory;

    protected $table = "non_registered_human";

    public function answers()
    {
        return $this->hasMany(answer_selected::class, 'non_registered_human');
    }
}
