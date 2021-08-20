@extends('main')
@section('content')
<header class="quiz-header">
    <h1 id="title" class="title"></h1>
    <label id="category" class="category"></label>
</header>

<div class="buttons-user" id="btn-user">
    <div class="btn-container prev-user">
        <button class="qme-button red finish-reply" onclick="prevUser()"> < Usuario anterior</button>
    </div>
    <div class="btn-container next-user">
        <button class="qme-button red finish-reply"  onclick="nextUser()">Usuario siguiente ></button>
    </div>
</div>
<div id="quiz-all" class="quiz-container">
    <div id="quiz-container">
    </div>

</div>

<script>
        let QUIZ_TO_REPLY = '{!! $quiz !!}'
</script>
@endsection