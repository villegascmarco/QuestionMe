@extends('main')
@section('content')
<header class="module-header">
    <h1 class="module-title">
        Crea tu nueva encuesta
    </h1>
</header>
<main class="creation-container">
    <div class="qme-wizard" id="step-wizard">
        <div class="wizard-step active">
            <h2 class="wizard-step-title">Paso 1</h2>
            <p class="wizard-step-indication">Configuración inicial</p>
        </div>
        <div class="wizard-step">
            <h2 class="wizard-step-title">Paso 2</h2>
            <p class="wizard-step-indication">Selecciona una plantilla</p>
        </div>
        <div class="wizard-step">
            <h2 class="wizard-step-title">Paso 3</h2>
            <p class="wizard-step-indication">Agrega preguntas</p>
        </div>
        <div class="wizard-step">
            <h2 class="wizard-step-title">Paso 4</h2>
            <p class="wizard-step-indication">Ultimos detalles</p>
        </div>
    </div>
    <div class="creation-content margin-top-25">
        <div class="carousel" id="carousel">
            <div class="card form-one">
                <header>
                    <h1>Nombra tu nueva encuesta</h1>
                </header>
                <section class="step-section">
                    <div class="save-lbl" id="save-title">
                        <label class="label " for=" ">Título </label>
                        <br>
                        <input id="title" class="input news-input qme-input" type="text ">
                    </div>
                    <div class="save-lbl" id="save-category">
                        <label class="label " for=" ">Categoria</label>
                        <br>
                        <input id="category" class="input news-input qme-input" type="text " placeholder="Psicologia">
                    </div>
                </section>
            </div>
            <div class="card">
                <header>
                    <h1>Selecciona una plantilla</h1>

                    <div id="switch-template">
                        <span>¿Usar plantilla?</span>
                        <br>
                        <label class="switch" >
                            <input id="template-check" type="checkbox">
                            <span class="slider"></span>
                        </label>
                        <br>
                        <span class="accion" >*Esta acción no se puede deshacer</span>
                    </div>
                    
                </header>

                <div id="list-categories-bubbles" class="bubble-categories-container">
                </div>
                <section id="template-section" class="step-section layout-container-grid">
                    
                </section>
            </div>
            <div class="card">
                <header>
                    <h1>Agrega preguntas</h1>
                </header>
                <section class="step-section">
                    <fieldset class="qme-radio-group qme-required">
                        <label class="radio-group-title" for="">Tipo de pregunta</label>

                        <div class="qme-radio">
                            <input type="radio" value="2" onchange="getPosibleAnswers(this)" id="rd-open" name="question-type">
                            <label class="radio-text" for="rd-open">
                                Abierta
                            </label>
                        </div>
                        <div class="qme-radio">
                            <input type="radio" value="1" onchange="getPosibleAnswers(this)" id="rd-multiple" name="question-type">
                            <label class="radio-text" for="rd-multiple">
                                Opción múltiple
                            </label>
                        </div>
                    </fieldset>
                    <div class="question-container" id="question-container">
                        <div class="qme-input width-550 margin-15 simple qme-required">
                            <label class="label " for=" ">Escribe tu pregunta</label>
                            <input class="input " id="question" type="text " placeholder="Some text ">
                        </div>
                        <div id="answer-section" class="qme-input width-550 margin-15 simple qme-required">
                            <label class="label " for=" ">Respuesta correcta</label>
                            
                        </div>
                        <div class="btn-container" id="btn-container">
                            <button id="qu-save" class="qme-button red">Añadir</button>
                        </div>
                    </div>

                </section>
            </div>
            <div class="card">
                <header>
                    <h1>Últimos detalles</h1>
                </header>
                <section >
                    <fieldset class="qme-radio-group qme-required" id="is-public-step">
                        <label class="radio-group-title" for="">Quieres que otros usuarios puedan utlizar tu encuesta/cuestionario</label>

                        <div class="qme-radio">
                            <input type="radio" id="rd-public" name="is-public">
                            <label class="radio-text" for="rd-public">
                                Si
                            </label>
                        </div>
                        <div class="qme-radio">
                            <input type="radio" id="rd-close" name="is-public">
                            <label class="radio-text" for="rd-close">
                                No
                            </label>
                        </div>
                    </fieldset>
                    <div id="lastStep">

                    </div>
                </section>
            </div>
        </div>
    </div>
</main>
@endsection