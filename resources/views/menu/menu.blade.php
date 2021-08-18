<nav class="qme-navbar">
    <div class="navbar-icon">
        <a href="{{url('/')}}"><img src="{{ asset('img/png/logo.png')}}"  alt="app logo"/></a>
    </div>
    <ul class="navbar-content">
        @if(Auth::check())        
        @if(Auth::user()->status==1)
        <li class="navbar-item ">
            <a href="{{url('dashboard')}}">
                Dashboard
            </a>
        </li>            

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
        <li class="navbar-item navbar-drop">
            <button class="notification" id="dropNotification">
                {{-- <img src="{{ asset('img/svg/icons/bell.svg') }}" alt=""> --}}
                <label class="notification-number active">+9</label>
            </button>
            <ul class="navbar-drop-drop" id="dropMenuNotification">
                <li class="notification-body new">
                    <a href="">Han contestado a una de tus encuestas</a>
                    <button class="closeNotification"></button>
                </li>                
            </ul>
        </li>

        @endif

        <li class="navbar-item navbar-button navbar-drop">
            <figure class="qme-menu-user"  id="openMenu">
                {{-- <img  src="{{'https://i.imgur.com/sevGHor.png'}}" alt="User picture"> --}}
                <img  src="{{session('userPicture')}}" alt="User picture">
            </figure>
            <ul class="navbar-drop-drop" id="dropMenu">
                <li>
                    <a href="{{url('my-account')}}">Mi perfil</a>
                </li>
                <li>
                    <a href="{{url('logout')}}">Cerrar sesión</a>
                </li>
            </ul>
        </li>            
        @else
        
        <li class="navbar-item ">
            <a href="{{url('signup')}}">
                Registrarme
            </a>
        </li>   
        <li class="navbar-item ">
            <button class="qme-button red">
                <a  href={{url('login')}}>Iniciar sesión</a>
            </button>
        </li>  
        @endif

    </ul>
</nav>