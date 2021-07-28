<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class possible_answer extends Model
{
    use HasFactory;

    protected $table = "possible_answer";

    public $timestamps = false;

    public function questions()
    {
        return $this->belongsTo(question::class, 'question');
    }
}
