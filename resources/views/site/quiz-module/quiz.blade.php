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
                <input type="text" class="table-search-input" placeholder="Busca un usuario aquí" />
            </div>
            <div class="module-table-parent">
                <table class="module-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad de preguntas</th>
                            <th>Personas que han respondido</th>
                            <th>Categorias</th>
                            <th>Plantilla utilizada</th>
                            <th>Estado</th>
                            <th>Detalle</th>
                            <th>Desactivar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Encuesta de prueba</td>
                            <td>10</td>
                            <td>6</td>
                            <td>
                                <div class="bubble-categories-container">
                                    <label class="bubble no-button">Ciencias</label>
                                </div>
                            </td>
                            <td>No aplica</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail" ">
                                    <img src="{{asset('img/svg/icons/view.svg')}} " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="{{asset('img/svg/icons/trash.svg')}} " alt=" ">
                            </button>
                            </td>
                        </tr>                                                       
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <aside class="module-adm-panel " id="adm-panel ">
        <button class="qme-close " id="btn-close "></button>
        <header>
            <h1>Administrando encuesta</h1>
        </header>
        <div class="adm-panel-body ">
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" ">Nombre</label>
                <input class="input " type="text " placeholder="Some text ">
            </div>
            <div class="qme-select simple margin-top-25 margin-5 qme-required ">
                <label class="label " for=" ">Estatus</label>
                <select class="select " name=" " id=" " disabled>
                    <option value=" ">Activo</option>
                    <option value=" ">Inactivo</option>
                </select>
            </div>
            <div class="qme-bubble-category simple margin-top-25 margin-5 qme-required ">
                <label class="label " for=" ">Categorias</label>
                <div class="bubble-categories-container ">
                    <label class="bubble ">Ciencias</label>
                    <label class="bubble bubble-button ">
                        <img src="./assets/svg/icons/plus-white.svg " alt=" ">
                    </label>
                </div>
            </div>
        </div>
        <div class="adm-panel-controls margin-top-50 ">
            <button class="qme-button simple margin-left-15 margin-right-15 ">Cancelar</button>
            <button class="qme-button red margin-left-15 margin-right-15 ">Guardar</button>
        </div>
    </aside>
</section>
@endsection