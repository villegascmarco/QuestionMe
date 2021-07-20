let tableController = null;
let admPanel = document.getElementById('adm-panel');
let btnShowPanel = document.getElementById('btn-show-panel');
let btnClose = document.getElementById('btn-close');
let btnGuardar = document.getElementById('btn-guardar');
let btnCancelar = document.getElementById('btn-cancelar');
let form = document.querySelector('form[name="main-form"]');
let formHandler = null;
let formOptions = {};
let userList = [];

let TITLE_SUCCESS_ADD = '¡Bien!';
let DESCRIPTION_SUCCESS_ADD = 'El usuario se ha añadido.';
let TITLE_ERROR = 'Ups!';
let DESCRIPTION_ERROR = 'Ha ocurrido un problema interno, intenta de nuevo más tarde.';

window.onload = _ => {

    let requestForUsers = fetch('url');

    startFormHandler();

    requestForUsers
        .then((response) => {
            userList = response.users;
            addDataToList(userList);
        })
        .catch((err) => {
            console.log(err);
        });

    btnShowPanel.addEventListener('click', _ => {
        gsap.to(admPanel, {
            duration: 0.2,
            x: '0%',
            display: 'block'
        });
    });

    btnClose.addEventListener('click', _ => {
        gsap.to(admPanel, {
            duration: 0.2,
            x: '100%',
            display: 'none'
        });
        formHandler.clear();
    });


    btnGuardar.addEventListener('click', _ => {

        if (!formHandler) {
            startFormHandler()
        }
        console.log(formHandler.checkForm());
        if (!formHandler.checkForm()) {
            return;
        }

        let newUser = formHandler.getAsObject();

        newUser = {
            ...newUser,
            'status': 1
        };

        add(newUser)
            .then(resp => {

                Swal.fire({
                    icon: 'success',
                    title: TITLE_SUCCESS_ADD,
                    text: DESCRIPTION_SUCCESS_ADD
                });

                formHandler.changeDisabledAll(false);
                formHandler.setFromObject(get());

            })
            .catch(err => {

                Swal.fire({
                    icon: 'error',
                    title: TITLE_ERROR,
                    text: DESCRIPTION_ERROR
                });

            });


    });

    btnCancelar.addEventListener('click', _ => {
        if (!formHandler) {
            startFormHandler()
        }
        formHandler.clear();
    });

}

let startTable = () => {
    tableController = new Table(document.getElementById('main-table'));
}

let addDataToList = () => {
    if (!tableController) {
        return;
    }

    tableController.clear();

    tableController.showData({
        data: userList,
        columns: [{
                funct: (value) => {
                    let img = document.createElement('img');
                    img.setAttribute('src', value['fotografia']);
                    return img;
                },
            },
            { column: 'nombre' },
            { column: 'registrado' },
            { column: 'rol' },
            { column: 'estado' },
            {
                funct: (value) => {
                    let button = document.createElement('button');
                    button.setAttribute('class', 'table-btn btn-detail');
                    let img = document.createElement('img');
                    img.setAttribute('src', `${ASSETS_ROUTE}img/svg/icons/view.svg`);
                    button.appendChild(img);
                    button.addEventListener('click', () => {
                        console.log(value);
                    })

                    return button;
                }
            },
            {
                funct: (value) => {
                    let button = document.createElement('button');
                    button.setAttribute('class', 'table-btn btn-detail');
                    let img = document.createElement('img');
                    img.setAttribute('src', `${ASSETS_ROUTE}img/svg/icons/trash.svg`);
                    button.appendChild(img);
                    button.addEventListener('click', () => {
                        console.log(value);
                    })

                    return button;
                }
            }
        ]
    });

}

let add = newUser => {

    return fetch("url", {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(obj)
    });

}

let edit = _ => {

    return fetch("url", {
        method: "PUT",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(obj)
    });

};

let remove = _ => {

    return fetch("url", {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(obj)
    });

}

let get = (id = 0) => {
    return fetch('url')
        .then(response => response)
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: TITLE_ERROR,
                text: DESCRIPTION_ERROR
            });
        })
}

let startFormHandler = _ => {
    var elList = Array.from(form.querySelectorAll('input, select, textarea'));
    var validations = {
        'name': (val) => {
            return val.trim() !== '';
        },
        'last-name': (val) => {
            return val.trim() !== '';
        },
        'role': (val) => {
            return val > 0;
        }
    };

    // <div class="qme-alert-form">
    //     Por favor, selecciona un rol válido
    // </div>

    formHandler = new FormsValidator(elList, validations);

}