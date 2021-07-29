@extends('main')
@section('content')
<div class="loginContainer">
    <h1 class="loginTitle">Registrarme</h1>
    <label class="inputTitle">Nombre</label>
    <input class="inputLogin" name="name" type="text" autocomplete="off" form-message="Por favor, ingresa un nombre" required>
    <label class="inputTitle">Apellido</label>
    <input class="inputLogin" name="last_name" type="text" autocomplete="off" form-message="Por favor, ingresa un apellido" required>
    <label class="inputTitle">Fecha de nacimiento</label>
    <input class="inputLogin" name="date_birth" type="date" autocomplete="off" form-message="Por favor, ingresa una fecha de nacimiento" required>
    <label class="inputTitle">Correo electrónico</label>
    <input class="inputLogin" name="email" type="email" autocomplete="off" form-message="Por favor, ingresa una fecha de nacimiento" required>
    <label class="inputTitle">Nombre de usuario</label>
    <input class="inputLogin" name="email" type="email" autocomplete="off" form-message="Por favor, ingresa una fecha de nacimiento" required>
    
    
    
    <button class="btnLogIn">Iniciar sesión</button>
    <br>
    <a href="#">Ya tengo una cuenta</a>
    <div class="line">
      <h3 class="alternative">Ingresa con</h3>
    </div>
    <div class="social-media">
      <div id="loginGoogle" class="google-btn"> 
        <div class="google-icon-wrapper"> <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"></div>
        <p class="btn-text"> <strong>Google</strong></p>
      </div>
      <div id="loginFacebook" class="facebook-btn"> 
        <div class="facebook-icon-wrapper"> <img class="facebook-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/F_icon_reversed.svg/1024px-F_icon_reversed.svg.png"></div>
        <p class="btn-text"><a href="login/facebook"><strong>Facebook</strong></a></p>
      </div>
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