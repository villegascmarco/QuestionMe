@extends('main')
@section('content')
<header class="module-header">
    <h1 class="module-title">
        Categoría
    </h1>
</header>
<section class="panel-container">
    <main class="module-content" id="content-panel">
        <header class="module-content-header">
            <div>                
            </div>
            <div class="module-buttons">
                <button class="qme-button round red" id="btn-show-panel">
                    <img class="icon" src="{{asset('img/svg/icons/plus-white.svg')}}">
                </button>
            </div>
        </header>
        <div class="module-table-container">
            <div class="table-search">
                <img src="{{ asset('img/svg/icons/search.svg')}}" class="table-search-icon" />
                <input type="text" class="table-search-input" id="txtTableSearch" placeholder="Busca una categoría aquí" />
            </div>
            <div class="module-table-parent">
                <table class="module-table" id="main-table">
                    <thead>
                        <tr>                        
                            <th>Nombre</th>                                                
                            <th>Estado</th>
                            <th>Detalle</th>
                            <th>Desactivar / Activar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7" class="text-inactive">No hay categorías disponibles </td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <aside class="module-adm-panel " id="adm-panel">
        <button class="qme-close " id="btn-close"></button>
        <header>
            <h1>Administrando categoría</h1>
        </header>
        <form class="adm-panel-body " name="main-form">
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for="" >Nombre</label>
                <input class="input " type="text " name="name" placeholder="Some text " autocomplete="off" form-message="Por favor, ingresa un nombre">
            </div>
            <div class="qme-select simple margin-top-25 margin-5">
                <label class="label " for=" ">Estado</label>
                <select class="select " name="status" disabled form-message="Por favor, selecciona un estatus válido">                    
                    <option value="0">Selecciona un estado</option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                </select>                
            </div>                        
        </form>
        <div class="adm-panel-controls margin-top-50 ">
            <button class="qme-button simple margin-left-15 margin-right-15 " id="btn-cancelar">Cancelar</button>
            <button class="qme-button red margin-left-15 margin-right-15 " id="btn-guardar">Guardar</button>
        </div>
    </aside>
</section>
@endsection