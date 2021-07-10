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
                        <select class="select" name="" id="" class="select">
                            <option value="0">Seleccione una opcion</option>
                            <option>Administrador</option>
                            <option>Usuario</option>                
                        </select>
                    </div>

                </div>
            </div>
            <div class="module-buttons">
                <button class="qme-button round red">
                    <img class="icon" src="./assets/svg/icons/plus.svg">
                </button>
            </div>
        </header>
        <div class="module-table-container">
            <div class="table-search">
                <img src="./assets/svg/icons/search.svg" class="table-search-icon" />
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
                        <!-- <tr>
                        <td colspan="7" class="text-inactive">No hay usuarios disponibles </td>
                    </tr> -->
                        <tr>
                            <td class="table-picture">
                                <img src="./assets/img/eddie.jpeg" alt="">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail" ">
                                    <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
                        </tr>                           
                        <tr>
                            <td class="table-picture ">
                                <img src="./assets/img/eddie.jpeg " alt=" ">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail " ">
                                <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-picture">
                                <img src="./assets/img/eddie.jpeg" alt="">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail" ">
                                    <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
                        </tr>                           
                        <tr>
                            <td class="table-picture ">
                                <img src="./assets/img/eddie.jpeg " alt=" ">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail " ">
                                <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-picture">
                                <img src="./assets/img/eddie.jpeg" alt="">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail" ">
                                    <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
                        </tr>                           
                        <tr>
                            <td class="table-picture ">
                                <img src="./assets/img/eddie.jpeg " alt=" ">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail " ">
                                <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-picture">
                                <img src="./assets/img/eddie.jpeg" alt="">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail" ">
                                    <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
                        </tr>                           
                        <tr>
                            <td class="table-picture ">
                                <img src="./assets/img/eddie.jpeg " alt=" ">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail " ">
                                <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-picture">
                                <img src="./assets/img/eddie.jpeg" alt="">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail" ">
                                    <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
                        </tr>                           
                        <tr>
                            <td class="table-picture ">
                                <img src="./assets/img/eddie.jpeg " alt=" ">
                            </td>
                            <td>Eddie</td>
                            <td>Facebook</td>
                            <td>Usuario</td>
                            <td>Activo</td>
                            <td>
                                <button class="table-btn btn-detail " ">
                                <img src="./assets/svg/icons/view.svg " alt=" ">
                                </button>
                            </td>
                            <td>
                                <button class="table-btn btn-delete ">
                                <img src="./assets/svg/icons/trash.svg " alt=" ">
                            </button>
                            </td>
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
        <div class="adm-panel-body ">
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" ">Nombre</label>
                <input class="input " type="text " placeholder="Some text ">
            </div>
            <div class="qme-input simple margin-top-25 qme-required ">
                <label class="label " for=" ">Apellido</label>
                <input class="input " type="text " placeholder="Some text ">
            </div>

            <div class="qme-select simple margin-top-25 margin-5 qme-required ">
                <label class="label " for=" ">Estatus</label>
                <select class="select " name=" " id=" " disabled>
                    <option value=" ">Activo</option>
                    <option value=" ">Inactivo</option>
                </select>
            </div>
            <div class="qme-select simple margin-top-25 margin-5 qme-required ">
                <label class="label " for=" ">Rol</label>
                <select class="select " name=" " id=" ">
                    <option value=" ">Usuario</option>
                    <option value=" ">Administrador</option>
                </select>
            </div>
        </div>
        <div class="adm-panel-controls margin-top-50 ">
            <button class="qme-button simple margin-left-15 margin-right-15 ">Cancelar</button>
            <button class="qme-button red margin-left-15 margin-right-15 ">Guardar</button>
        </div>

    </aside>
</section>
@endsection