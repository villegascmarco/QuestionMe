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
                <img src="{{session('userPicture')}}" alt="">
            </figure>
            <h3 class="user-name">Moises Morua</h3>
            <label class="user-role">(Usuario regular)</label>
        </div>
        <button class="qme-button simple">Editar fotografía</button>
    </header>
    <section class="section user-info">
        <header>
            <h2>Datos del usuario</h2>
        </header>
        <div class="user-attr">
            <div>
                <label>Nombre de usuario</label>
                <p>Moiiiiiiii</p>
            </div>
            <button class="qme-button red">Editar</button>
        </div>
        <div class="user-attr">
            <div>
                <label>Correo electrónico</label>
                <p>aaaa@dominio.com</p>
            </div>
            <button class="qme-button red">Editar</button>
        </div>
    </section>
    <section class="section user">  
        <header>
            <h2>Autenticación</h2>
        </header>
        <button class="qme-button blue">Cambiar contraseña</button>
    </section>
</main>

@endsection