<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    //BORRAR ESTO EN UN FUTURO PLS
    protected $except = [
        'questions',
        'categories',
        'users',
        'human',
        'user_role'
    ];
}
