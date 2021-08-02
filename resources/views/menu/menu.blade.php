<nav class="qme-navbar">
    <div class="navbar-icon">
        <a href="/"><img src="{{ asset('img/png/logo.png')}}"  alt="app logo"/></a>
    </div>
    <ul class="navbar-content">
        @if (Auth::user()->role==2)
            <li class="navbar-item ">
                <a href="{{url('categorias')}}">
                    Categorías
                </a>
            </li>
            <li class="navbar-item ">
                <a href="{{url('/user')}}">
                    Usuarios
                </a>
            </li>        
        @endif
        <li class="navbar-item active">
            <a href="{{url('')}}">
                Encuestas
            </a>
        </li>
        <li class="navbar-item navbar-button">
            <button class="qme-button red" href={{url('')}}>
                Crear encuesta
            </button>
        </li>
    </ul>
</nav>