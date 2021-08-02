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
                    <div class="save-lbl">
                        <label class="label " for=" ">Título</label>
                        <br>
                        <div class="qme-alert-form">Ingresa un título</div>
                        <input id="title" class="input news-input qme-input" type="text ">
                    </div>
                    <div class="save-lbl">
                        <label class="label " for=" ">Categoria</label>
                        <br>
                        <input id="category" class="input news-input qme-input" type="text " placeholder="Psicologia">
                    </div>
                </section>
            </div>
            <div class="card">
                <header>
                    <h1>Selecciona una plantilla</h1>

                    <span>¿Usar plantilla?</span>

                    <br>
                    
                    <label class="switch">
                        <input id="template-check" type="checkbox">
                        <span class="slider"></span>
                    </label>
                    
                </header>
                <section id="template-section" class="step-section layout-container-grid">
                    <div class="layout-container">
                        <header>
                            <h3>Nombre plantilla</h3>
                        </header>
                    </div>
                    <div class="layout-container">
                        <header>
                            <h3>Nombre plantilla</h3>
                        </header>
                    </div>
                    <div class="layout-container">
                        <header>
                            <h3>Nombre plantilla</h3>
                        </header>
                    </div>
                    <div class="layout-container">
                        <header>
                            <h3>Nombre plantilla</h3>
                        </header>
                    </div>
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
                            <input type="radio" id="rd-open" name="question-type">
                            <label class="radio-text" for="rd-open">
                                Abierta
                            </label>
                        </div>
                        <div class="qme-radio">
                            <input type="radio" id="rd-single" name="question-type">
                            <label class="radio-text" for="rd-single">
                                Una opción correcta
                            </label>
                        </div>
                        <div class="qme-radio">
                            <input type="radio" id="rd-multiple" name="question-type">
                            <label class="radio-text" for="rd-multiple">
                                Opción múltiple
                            </label>
                        </div>
                    </fieldset>
                    <div class="question-container">
                        <div class="qme-input width-550 margin-15 simple qme-required">
                            <label class="label " for=" ">Escribe tu pregunta</label>
                            <input class="input " type="text " placeholder="Some text ">
                        </div>
                        <div class="qme-input width-550 margin-15 simple qme-required">
                            <label class="label " for=" ">Respuesta correcta</label>
                            <input class="input " type="text " placeholder="Some text ">
                        </div>
                        <div class="btn-container">
                            <button class="qme-button red">Guardar</button>
                        </div>
                    </div>

                </section>
            </div>
            <div class="card">
                <header>
                    <h1>Últimos detalles</h1>
                </header>
                <section>
                    <fieldset class="qme-radio-group qme-required">
                        <label class="radio-group-title" for="">Visibilidad de tu encuesta</label>

                        <div class="qme-radio">
                            <input type="radio" id="rd-open-now" name="question-type">
                            <label class="radio-text" for="rd-open-now">
                                Abrir ahora
                            </label>
                        </div>
                        <div class="qme-radio">
                            <input type="radio" id="rd-program" name="question-type">
                            <label class="radio-text" for="rd-program">
                                Programar apertura
                            </label>
                        </div>
                        <div class="qme-radio">
                            <input type="radio" id="rd-ask-later" name="question-type">
                            <label class="radio-text" for="rd-ask-later">
                                Pregúntame luego
                            </label>
                        </div>
                    </fieldset>
                </section>
            </div>
        </div>
    </div>
</main>
@endsection