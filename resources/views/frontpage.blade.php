@extends('main')
@section('content')
<div class="page-container">

    <div class="hero-container">

        <div class="presentation-container">
            <h1 class="presentation-title">QuestionMe!</h1>
            <p class="presentation-text">La plataforma indicada para la creación
                de encuestas y cuestionarios</p>
            <a class="cta-btn" href="#">¡Empieza ahora!</a>

        </div>

        <div class="img-container">
            <img class="hero-image" src="{{asset('img/svg/browsing.svg')}}" alt="browsing">
        </div>

        <div class="categories">
            <p class="title-categories">Categorias</p>
            <ul class="all-categories">
                <li class="category">
                    <a class="category-inside" href="#">
                        Historia
                    </a>
                </li>
                <li class="category">
                    <a class="category-inside" href="#">
                        Matematicas
                    </a>
                </li>
                <li class="category">
                    <a class="category-inside" href="#">
                        Ciencia
                    </a>
                </li>
                <li class="category">
                    <a class="category-inside" href="#">
                        Politica
                    </a>
                </li>
                <li class="category">
                    <a class="category-inside" href="#">
                        Psicologia
                    </a>
                </li>
                <hr />
            </ul>
        </div>
    </div>

    <div class="information-container">
        <div class="box">
            <div class="section" data-aos="fade-right" data-aos-duration="3000" offset="120" easing="ease">
                <div id="pin">
                    <div id="">

                        <div class="pie-content">
                            <img class="pie-img" src="{{asset('img/svg/pie-chart.svg')}}" alt="pie">
                            <p class="visualize-title">Visualiza la información</p>
                            <p class="visualize-text">
                                Contamos con una sofisticada forma de conocer las respuestas dadas por los usuarios,
                                de
                                manera sencilla podras visualizar cuales fueron las opciones mas respondidas
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            <div class="section" data-aos="fade-right" data-aos-duration="3000" offset="120" easing="ease">
                <div id="pin">
                    <div id="">

                        <div class="pie-content">
                            <img class="pie-img" src="{{asset('img/svg/exam.svg')}}" alt="pie">
                            <p class="visualize-title">Cuestionarios</p>
                            <p class="visualize-text">
                                Realiza cuestionarios a tus estudiantes o compañeros, visualiza sus respuestas y resultados.
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            <div class="section" data-aos="fade-right" data-aos-duration="3000" offset="120" easing="ease">
                <div id="pin">
                    <div id="">

                        <div class="pie-content">
                            <img class="pie-img" src="{{asset('img/svg/growth.svg')}}" alt="pie">
                            <p class="visualize-title">Más votado</p>
                            <p class="visualize-text">
                               Realiza encuestas donde podras visualizar lo mas elegido por los usuarios de manera sencilla y clara
                            </p>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>

    <div class="template-container">
        <h1>Plantillas</h1>
        <div class="templates-body">
            <img class="templates-img" src="{{asset('img/png/templates.png')}}" alt="">
            <p class="templates-text">
                No inicies desde <strong>0</strong>
                utiliza una de las <strong>plantillas</strong>
                creadas por los usuarios <br>
                <a class="cta-btn-bottom" href="#">¡Empieza ahora!</a>
            </p>

        </div>
    </div>

</div>

<footer class="footer">
    <div class="glassware">
        <h1>QuestionMe!</h1>
        <p>
            QuestionMe! <br>
            Todos los derechos reservados <br>
            GLASSWARE™
        </p>
    </div>

    <div class="about">
        <span class="footer-list-title">Acerca de nosotros</span>
        <ul>
            <li class="footer-links"><a href="#">Contacto</a></li>
            <li class="footer-links"><a href="">Quienes somos</a></li>
        </ul>

    </div>

    <div class="FAQ">
        <span class="footer-list-title">Preguntas frecuentes</span>
        <ul>
            <li class="footer-links"><a href="">Ayuda</a></li>
            <li class="footer-links"><a href="">FAQ</a></li>
        </ul>
    </div>

</footer>
@endsection