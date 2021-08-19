@extends('main')
@section('content')
<header class="quiz-header">
    <h1 class="title">Lenguajes de programación</h1>
    <label class="category">Programación</label>
</header>

<div class="quiz-container">
    <div class="question-container-reply">
        <label class="question-reply"> 1. Mejor lenguaje de programación</label>
        <div class="answers-container">
            <div class="answer">
                <input type="radio" name="answer-1" id="answers1">
                <label for="answer1">Python</label>
            </div>
            <div class="answer">
                <input type="radio" name="answer-1" id="answers2">
                <label for="answer2">Python</label>
            </div>
            
        </div>
    </div>
    <div class="question-container-reply">
        <label class="question-reply"> 2. Mejor lenguaje de programación</label>
        <div class="answers-container">
            <div class="answer qme-input special-login margin-top-25">
                <label class="label" for="answer2">Respuesta</label>
                <input class="input answer-input" type="text" name="answer-2" id="answers2">
            </div>
            

        </div>
        <div class="question-container-reply">
        <label class="question-reply"> 3. Mejor lenguaje de programación</label>
        <div class="answers-container">
            <div class="answer">
                <input type="radio" name="answer-3" id="answers1">
                <label for="answer1">Python</label>
            </div>
            
            <div class="answer">
                <input type="radio" name="answer-3" id="answers2">
                <label for="answer2">Python</label>
            </div>

            <div class="answer">
                <input type="radio" name="answer-3" id="answers2">
                <label for="answer2">Python</label>
            </div>
            
        </div>

        <div class="question-container-reply">
            <label class="question-reply"> 4. Mejor lenguaje de programación</label>
        <div class="answers-container">
            <div class="answer">
                <input type="radio" name="answer-4" id="answers1">
                <label for="answer1">Python</label>
            </div>
            
            <div class="answer">
                <input type="radio" name="answer-5" id="answers2">
                <label for="answer2">Python</label>
            </div>
            
        </div>
    </div>
    <div class="btn-container reply-btn-container" id="btn-container">
        <button id="qu-save" class="qme-button red finish-reply">Enviar respuestas</button>
    </div>
</div>
@endsection