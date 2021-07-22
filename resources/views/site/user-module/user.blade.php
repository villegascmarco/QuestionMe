@extends('main')
@section('content')
<header class="module-header">
    <h1 class="module-title">
        Usuario
    </h1>
</header>
<section class="panel-container">
    <main class="module-content" id="content-panel">
        <header class="module-content-header">
            <div class="module-filters">
                <h3 class="filters-title">filtros</h3>
                <div class="filter-container">
                    <div class="qme-select margin-10">
                        <label class="label" for="">Rol</label>
                        <select class="select" name="" id="roleSelect" class="select">
                            <option value="0">Seleccione una opcion</option>                                      
                        </select>
                    </div>
                </div>
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
                <input type="text" class="table-search-input" id="txtTableSearch" placeholder="Busca un usuario aquí" />
            </div>
            <div class="module-table-parent">
                <table class="module-table" id="main-table">
                    <thead>
                        <tr>
                            <th>Fotografía</th>
                            <th>Nombre</th>
                            <th>Registrado con</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Detalle</th>
                            <th>Desactivar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7" class="text-inactive">No hay usuarios disponibles </td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <aside class="module-adm-panel " id="adm-panel">
        <button class="qme-close " id="btn-close"></button>
        <header>
            <h1>Administrando usuario</h1>
        </header>
        <form class="adm-panel-body " name="main-form">
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" " >Nombre</label>
                <input class="input " type="text " name="name" placeholder="Some text " autocomplete="off" form-message="Por favor, ingresa un nombre">
            </div>
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" " >Apellido</label>
                <input class="input " type="text " name="last_name" placeholder="Some text " autocomplete="off" form-message="Por favor, ingresa un apellido">
            </div>
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" " >Fecha de nacimiento</label>
                <input class="input " type="date" name="date_birth" id="testDate" placeholder="Some text " autocomplete="off" form-message="Por favor, selecciona una fecha de nacimiento">
            </div>
            <div class="qme-input simple file margin-top-25 qme-required ">
                <label class="label " for=" " >Fotografía</label>
                <input class="input " type="file" name="picture" id="picture" accept=".jpg,.png" autocomplete="off" form-message="Por favor, selecciona una fotografía">
            </div>
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" " >Correo electrónico</label>
                <input class="input " type="email" name="email" placeholder="Some text " autocomplete="off" form-message="Por favor, ingresa un correo electrónico">
            </div>
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" " >Nombre de usuario</label>
                <input class="input " type="text" name="nameUser" placeholder="Some text " autocomplete="off" form-message="Por favor, ingresa un correo electrónico">
            </div>
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" " >Contraseña</label>
                <input class="input " type="password" name="password" placeholder="Some text " autocomplete="off" form-message="Por favor, ingresa una contraseña">
            </div>
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" " >Confirma la contraseña</label>
                <input class="input " type="password" name="confirm-password" id="confirm-password" placeholder="Some text " autocomplete="off" form-message="Las contraseñas no coinciden">
            </div>
            <div class="qme-select simple margin-top-25 margin-5">
                <label class="label " for=" ">Estado</label>
                <select class="select " name="status" disabled form-message="Por favor, selecciona un estatus válido">                    
                    <option value="0">Selecciona un estado</option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                </select>                
            </div>            
            <div class="qme-select simple margin-top-25 margin-5 qme-required ">
                <label class="label " for=" ">Rol</label>
                <select class="select " name="role" form-message="Por favor, selecciona un rol válido">
                    <option value="0">Selecciona un rol</option>
                    <option value="1">Usuario</option>
                    <option value="2">Administrador</option>
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