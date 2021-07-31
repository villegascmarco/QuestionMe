@extends('main')
@section('content')
<div class="register-container">
    <h1>Registro</h1>
    <div class="register-form">
        <div class="principal-register">
            <label for="email">Correo electronico</label>
            <input class="register-inputs" type="email" name="email" id="email">


            <label for="name">Nombre</label>
            <input class="register-inputs" type="text" name="name" id="name">

            <label for="lastname">Apellidos</label>
            <input class="register-inputs" type="text" name="lastname" id="lastname">

            <label for="password">Contraseña</label>
            <input class="register-inputs" type="password" name="password" id="password">

        </div>

        <div class="register-pass">
            <label for="confirmpass">Confirmar contraseña</label>
            <input class="register-inputs" type="password" name="confirmpass" id="confirmpass">
            <br>
        </div>

        <div class="register-button">
            <input class="register-btn" type="submit" value="Registrarse">
        </div>

        <div class="register-image">
            <img class="img-register" src="{{asset('img/svg/email.svg')}}" alt="email">
        </div>
    </div>
</div>

@endsection