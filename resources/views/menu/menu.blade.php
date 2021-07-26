<nav class="qme-navbar">
    <div class="navbar-icon">
        <a href="/"><img src="{{ asset('img/png/logo.png')}}"  alt="app logo"/></a>
    </div>
    <ul class="navbar-content">
        <li class="navbar-item active">
            <a href="encuesta.html">
                Encuestas
            </a>
        </li>
        <li class="navbar-item ">
            <a href="categoria.html">
                Categorías
            </a>
        </li>
        <li class="navbar-item ">
            <a href="{{url('/user')}}">
                Usuarios
            </a>
        </li>
        <li class="navbar-item ">
            <a href="usuario.html">
                Roles
            </a>
        </li>
        <li class="navbar-item navbar-button">
            <button class="qme-button red" onclick="window.location = 'encuesta-creacion.html'">
                Crear encuesta
            </button>
        </li>
    </ul>
</nav>