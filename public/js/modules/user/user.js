let tableController = null;
let admPanel = document.getElementById('adm-panel');
let btnShowPanel = document.getElementById('btn-show-panel');
let btnClose = document.getElementById('btn-close');
let btnGuardar = document.getElementById('btn-guardar');
let btnCancelar = document.getElementById('btn-cancelar');
let form = document.querySelector('form[name="main-form"]');
let confirmPassword = document.getElementById('confirm-password');
let picture = document.getElementById('picture');
let roleSelect = document.getElementById('roleSelect');
let formHandler = null;
let formOptions = {};
let userList = [];


const TITLE_CONFIRM_ADD = '¡Espera!';
const DESCRIPTION_CONFIRM_ADD = '¿Deseas añadir el nuevo usuario?';
const CONFIRM_BUTTON = 'Continuar';
const CANCEL_BUTTON = 'Cancelar';
const TITLE_SUCCESS_ADD = '¡Bien!';
const DESCRIPTION_SUCCESS_ADD = 'El usuario se ha añadido.';
const TITLE_ERROR = 'Ups!';
const DESCRIPTION_ERROR = 'Ha ocurrido un problema interno, intenta de nuevo más tarde.';
const REGEX_DATE = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

window.onload = _ => {

    getRoleList()
        .then(resp => resp.json())
        .then(data => {
            data.forEach(el => {
                let opt = document.createElement('option');
                opt.setAttribute('value', el.id);
                opt.innerText = el.name;

                roleSelect.appendChild(opt);
            })
        })

    startFormHandler();

    confirmPassword.addEventListener('keyup', _ => checkingPassword(confirmPassword));

    roleSelect.addEventListener('change', evt => {
        console.log('test');
        searchByRole(evt.target.value);
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


    btnGuardar.addEventListener('click', async _ => {



        if (!formHandler) {
            startFormHandler()
        }


        if (!formHandler.checkForm()) {
            return;
        }

        let newUser = formHandler.getAsObject();

        if (newUser['password'] !== newUser['confirm-password']) {
            return;
        }

        let result = await Swal.fire({
            icon: 'info',
            title: TITLE_CONFIRM_ADD,
            text: DESCRIPTION_CONFIRM_ADD,
            showCancelButton: true,
            cancelButtonColor: 'gray',
            cancelButtonColor: CANCEL_BUTTON,
            confirmButtonText: CONFIRM_BUTTON,
            confirmButtonColor: 'rgba(255,0,0,0.6)'

        });

        if (!result.isConfirmed) {
            return;
        }


        let picUrl = await uploadPic(picture.files[0]);

        newUser = {
            ...newUser,
            'status': 1,
            'statusUser': 1,
            'picture': picUrl.url
        };

        add(newUser)
            .then(resp => resp.json())
            .then(data => {

                const RESULT = {
                    'OK': data => {
                        Swal.fire({
                            icon: 'success',
                            title: TITLE_SUCCESS_ADD,
                            text: DESCRIPTION_SUCCESS_ADD
                        });
                        formHandler.changeDisabledAll(false);
                        formHandler.setFromObject(data.user);
                    },
                    'error': data => {
                        Swal.fire({
                            icon: 'error',
                            title: TITLE_ERROR,
                            text: DESCRIPTION_ERROR
                        });
                    }
                };

                (RESULT[data.status] || RESULT['error'])(data);

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

let addDataToList = (userList) => {

    if (!tableController) {
        startTable();
    }

    tableController.clear();

    tableController.showData({
        data: userList,
        columns: [{
                funct: (value) => {
                    let img = document.createElement('img');
                    img.setAttribute('src', value['picture']);
                    return img;
                },
            },
            {
                funct: value => {
                    let lbl = document.createElement('label');
                    lbl.innerHTML = `${value['name']} ${value['last_name']}`
                    return lbl;
                }
            },
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

    return fetch(`${ASSETS_ROUTE}users`, {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(newUser)
    });

}

let edit = _ => {

    return fetch(`${ASSETS_ROUTE}/users`, {
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

let getListByRole = roleId => {
    return fetch(`${ASSETS_ROUTE}users/roleFind/${roleId}`);
}

let getRoleList = _ => {
    return fetch(`${ASSETS_ROUTE}user_role`);
}


let startFormHandler = _ => {
    var elList = Array.from(form.querySelectorAll('input, select, textarea'));
    var validations = {
        'name': val => val.trim() !== '',
        'last_name': val => val.trim() !== '',
        'date_birth': val => REGEX_DATE.test(val),
        'email': val => REGEX_EMAIL.test(String(val).toLowerCase()),
        'nameUser': val => val.trim() !== '',
        'password': val => val !== '',
        'confirm-pasword': val => val.trim() !== '',
        'role': val => val > 0
    };

    formHandler = new FormsValidator(elList, validations);

}

let checkingPassword = el => {
    console.log('test');

    let user = formHandler.getAsObject();

    let alertInserted = el.parentNode.querySelector('.qme-alert-form');
    if (alertInserted) {
        alertInserted.parentNode.removeChild(alertInserted);
    }

    if (user['password'] !== el.value) {
        var alert = document.createElement('div');
        alert.setAttribute('class', 'qme-alert-form');
        let message = el.getAttribute('form-message');
        message.trim() !== '' ?
            alert.innerText = message :
            alert.innerText = 'Este campo es requerido';
        el.parentNode.appendChild(alert);
    }

}

let uploadPic = async pic => {
    let formData = new FormData();

    formData.append("file", pic);
    formData.append("upload_preset", "oh1p0xxf");
    return fetch(
        "https://api.cloudinary.com/v1_1/dvbqcppe1/image/upload", {
            method: "POST",
            body: formData
        }
    ).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
}

let searchByRole = roleId => {
    if (roleId === 0) {
        return;
    }

    getListByRole(roleId)
        .then(response => response.json())
        .then((data) => {
            userList = data;
            addDataToList(userList);
        })
        .catch((err) => {
            console.log(err);
        });

};