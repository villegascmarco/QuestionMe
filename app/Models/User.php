<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;

    protected $table = 'user';

    public function routeNotificationForMail($notification)
    {
        //Para resolver las jaladas del @MoiMorua
        $human = human::find($this->human);
        return $human->email;
    }
}
