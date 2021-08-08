@extends('main')
@section('content')
<header class="module-header">
    <h1 class="module-title">
        Mi cuenta
    </h1>
</header>
<main class="main-content">
    <header class="main-header">
        <div class="main-info">
            <figure class="user-profile-pic">
                <img src="{{session('userPicture')}}" alt="" id="imgProfile">
            </figure>
            <h3 class="user-name skeleton" id="name"></h3>
            <label class="user-role skeleton" id="role"></label>
        </div>
        <button class="qme-button simple" id="btnEditPicture">Editar fotografía</button>
    </header>
    <section class="section user-info">
        <header>
            <h2>Datos del usuario</h2>
        </header>
        <div class="user-attr">
            <div>
                <label>Nombre de usuario</label>
                <p id="user-name" class="skeleton"></p>
            </div>
            <button class="qme-button red" id="btnEditUserName">Editar</button>
        </div>
        <div class="user-attr">
            <div>
                <label>Correo electrónico</label>
                <p id="email" class="skeleton"></p>
            </div>
            <button class="qme-button red" id="btnEditMail">Editar</button>
        </div>
    </section>
    <section class="section">  
        <header>
            <h2>Autenticación</h2>
        </header>
        <button class="qme-button blue" id="btnEditPassword">Cambiar contraseña</button>
    </section>
    <section class="section danger-zone">  
        <header>
            @if (Auth::user()->status)
            <h2>Zona peligrosa</h2>
            @else
            <h2>Zona de recuperación</h2>
            @endif
        </header>
        @if (Auth::user()->status)
        <button class="qme-button simple red" id="btnDeactivate">Desactivar mi cuenta</button>
        @else
        <button class="qme-button simple red" id="btnDeactivate">Reactivar mi cuenta</button>
        @endif
    </section>
</main>
@endsection