<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PossibleAnswer extends Model
{
    use HasFactory;

    protected $table = "possible_answer";

    public $timestamps = false;
}
