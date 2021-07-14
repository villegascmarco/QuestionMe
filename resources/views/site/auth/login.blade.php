@extends('main')
@section('content')
<div class="loginContainer">
      <h1 class="loginTitle">Iniciar sesion</h1>
      <label class="inputTitle">Email </label>
      <input class="inputLogin" type="text" required>
      <label class="inputTitle">Contraseña </label>
      <input class="inputLogin" type="password" required>
      <button class="btnLogIn">Iniciar sesión</button>
      <div class="line">
        <h3 class="alternative">ó</h3>
      </div>
      <div class="social-media">
        <div class="google-btn"> 
          <div class="google-icon-wrapper"> <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"></div>
          <p class="btn-text"> <strong>Google</strong></p>
        </div>
        <div class="facebook-btn"> 
          <div class="facebook-icon-wrapper"> <img class="facebook-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/F_icon_reversed.svg/1024px-F_icon_reversed.svg.png"></div>
          <p class="btn-text"><a href="login/facebook"><strong>Facebook</strong></a></p>
        </div>
      </div><a href="#">¿Olvidaste tu contraseña?</a>
    </div>
    
@endsection