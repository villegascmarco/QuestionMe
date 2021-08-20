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
            <a href="{{url('quiz')}}">
                Encuestas
            </a>
        </li>
        <li class="navbar-item navbar-button">
            <button class="qme-button red" onclick="goToQuiz()">
                Crear encuesta
            </button>
        </li>
        <li class="navbar-item navbar-drop">
            <button class="notification" id="dropNotification">
                {{-- <img src="{{ asset('img/svg/icons/bell.svg') }}" alt=""> --}}
                <label class="notification-number" id="notificationCount">+9</label>
            </button>
            <div class="navbar-drop-notification" id="dropMenuNotification">
                <header class="header">
                    <h3>Notificaciones</h3>
                    {{-- <button class="button-noti-header" id="showMore"></button> --}}
                    <button class="qme-button simple" id="markAsRead">
                        Marcar todas como leidas
                    </button>                                            
                </header>
                <ul class="notification-container" id="notificationsContainer"></ul>
            </div>
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