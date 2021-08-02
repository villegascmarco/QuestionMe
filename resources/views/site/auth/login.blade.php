@extends('main')
@section('content')
<div class="loginContainer" id="loginContainer">
      <h1 class="loginTitle">Iniciar sesion</h1>      
      <div class="qme-input special-login margin-top-25">
        <label class="label">Email</label>
        <input class="input" name="email" id="email" type="text" autocomplete="off" form-message="Por favor, ingresa un email válido">
      </div>
      
      <div class="qme-input special-login margin-25">        
        <label class="label">Contraseña </label>
        <input class="input" name="password" id="password" type="password" autocomplete="off" form-message="Por favor, ingresa una contraseña">        
      </div>
      <p class="error-login" id="credentialError">Parece que los datos ingresados no son correctos, intenta de nuevo</p>      
      <button class="btnLogIn" id='login'>Iniciar sesión</button>
      <br>
      <a href="{{url('/signup')}}">No tengo una cuenta</a>
      <div class="line">
        <h3 class="alternative">Ingresa con</h3>
      </div>
      <p class="error-login" id="socMedError">Parece que los datos ingresados no son correctos, intenta de nuevo</p>      
      <div class="social-media">
        <button id="loginGoogle" class="social-btn"> 
          <div class="social-icon-wrapper"> <img class="social-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"></div>
          <p class="btn-text"> <strong>Google</strong></p>
        </button>
        <button id="loginFacebook" class="facebook-btn"> 
          <div class="facebook-icon-wrapper"> <img class="facebook-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/F_icon_reversed.svg/1024px-F_icon_reversed.svg.png"></div>
          <p class="btn-text"><strong>Facebook</strong></p>
        </button>
      </div>
</div>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-auth.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-analytics.js"></script>


<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCZ0WFN45o_aOB8-9Zwv0q1FuCVUQRos5A",
    authDomain: "questionme-40788.firebaseapp.com",
    projectId: "questionme-40788",
    storageBucket: "questionme-40788.appspot.com",
    messagingSenderId: "108491240606",
    appId: "1:108491240606:web:75c74edde33f785034378f",
    measurementId: "G-5M8XBGTPBC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();  
</script>
@endsection