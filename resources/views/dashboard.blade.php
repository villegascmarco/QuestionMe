@extends('main')
@section('content')

<header class="module-header">
    <h1 class="module-title">Bienvenido</h1>
</header>

<main class="main-container">
    
    <section class="dashboard-section">
        <header>
            <h2 class="title-alternative">¿Ahora que hago?</h2>
        </header>

        <main>
            Parece que aún no tienes ninguna encuesta
            <button class="qme-button red" href="{{url('new-quiz')}}">
                Crear una encuesta
            </button>
        </main>        
    </section>
    <section class="dashboard-section">
        <header>
            <h2 class="title-alternative">Resumen de tus encuestas</h2>
        </header>

        <main class="template-summary">
            Tus plantillas han sido utilizadas un total de 
            <label class="count-template" id="countTemplate">0</label>        
            veces.    
        </main>        
    </section>
    <section class="dashboard-section">
        <header>
            <h2 class="title-alternative">Personas que han respondido una de tus encuestas</h2>
        </header>
        <main class="human-summary">            
            <table class="human-table" id="humanTable">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Encuesta</th>                                             
                    </tr>
                </thead>
                <tbody>
                    <tr class="human-row">                    
                        <td colspan="3" >Cargando...</td>                        
                    </tr>                        
                </tbody>
            </table>            
        </main>
    </section>

</main>


@endsection