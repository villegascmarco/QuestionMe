<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class non_registered_human extends Model
{
    use HasFactory;
    use Notifiable;

    protected $table = "non_registered_human";

    public function answers()
    {
        return $this->hasMany(answer_selected::class, 'non_registered_human');
    }
}
