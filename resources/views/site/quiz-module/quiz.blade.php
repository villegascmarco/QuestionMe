@extends('main')
@section('content')
<header class="module-header">
    <h1 class="module-title">
        Encuesta
    </h1>
</header>
<section class="panel-container">
    <main class="module-content" id="content-panel">
        
        <div class="module-table-container">
            <div class="table-search">
                <img src="{{asset('img/svg/icons/search.svg')}}" class="table-search-icon" />
                <input type="text" class="table-search-input" onkeyup="searchQuiz(this)" placeholder="Busca aquí" />
            </div>
            <div class="module-table-parent">
                <table class="module-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Edición</th>
                            <th>Compartir</th>
                            <th>Ver respuestas</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody id = "quizzes-table">
                        <tr>
                            <td>Cargando...</td>
                        </tr>                                                       
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</section>
@endsection