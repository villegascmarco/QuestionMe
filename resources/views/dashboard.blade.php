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
            <label class="count-template">0</label>        
            veces.    
        </main>        
    </section>
    <section class="dashboard-section">
        <header>
            <h2 class="title-alternative">Personas que han respondido una de tus encuestas</h2>
        </header>
        <main class="human-summary">            
            <table class="human-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Encuesta</th>                                             
                    </tr>
                </thead>
                <tbody>
                    <tr class="human-row">                    
                        <td>Oscar Alan Rodriguez Caudillo</td>
                        <td>hendrix666@gmail.com</td>
                        <td>Quiz falsa</td>
                    </tr>    
                    <tr class="human-row">                    
                        <td>Oscar Alan Rodriguez Caudillo</td>
                        <td>hendrix666@gmail.com</td>
                        <td>Quiz falsa</td>
                    </tr>    
                    <tr class="human-row">                    
                        <td>Oscar Alan Rodriguez Caudillo</td>
                        <td>hendrix666@gmail.com</td>
                        <td>Quiz falsa</td>
                    </tr>    
                    <tr class="human-row">                    
                        <td>Oscar Alan Rodriguez Caudillo</td>
                        <td>hendrix666@gmail.com</td>
                        <td>Quiz falsa</td>
                    </tr>    
                    <tr class="human-row">                    
                        <td>Oscar Alan Rodriguez Caudillo</td>
                        <td>hendrix666@gmail.com</td>
                        <td>Quiz falsa</td>
                    </tr>    
                    <tr class="human-row">                    
                        <td>Oscar Alan Rodriguez Caudillo</td>
                        <td>hendrix666@gmail.com</td>
                        <td>Quiz falsa</td>
                    </tr>    
                    <tr class="human-row">                    
                        <td>Oscar Alan Rodriguez Caudillo</td>
                        <td>hendrix666@gmail.com</td>
                        <td>Quiz falsa</td>
                    </tr>    
                    <tr class="human-row">                    
                        <td>Oscar Alan Rodriguez Caudillo</td>
                        <td>hendrix666@gmail.com</td>
                        <td>Quiz falsa</td>
                    </tr>    
                </tbody>
            </table>            
        </main>        

    </section>

    <section class="dashboard-section">
        <header>
            <h2 class="title-alternative">Consulta reportes de tus encuestas</h2>
        </header>

    </section>

</main>


@endsection