@extends('main')
@section('content')
<header class="quiz-header">
    <h1 id="title" class="title"></h1>
    <label id="category" class="category"></label>
</header>

<div class="quiz-container">
    <div id="quiz-container">
    </div>
        
    <div class="btn-container reply-btn-container" id="btn-container">
        <button  onclick="sendAnswers()" id="qu-save" class="qme-button red finish-reply">Enviar respuestas</button>
    </div>


</div>

<script>
        let QUIZ_TO_REPLY = '{!! $quiz !!}'
</script>
@endsection