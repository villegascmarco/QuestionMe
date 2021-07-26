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
let editMode = false;
let userEdit = {};


const TITLE_CONFIRM_ADD = '¡Espera!';
const DESCRIPTION_CONFIRM_ADD = '¿Deseas añadir el nuevo usuario?';
const DESCRIPTION_CONFIRM_EDIT = '¿Deseas modificar el usuario?';
const TITLE_CONFIRM_DEACTIVATE = '¡Espera!';
const DESCRIPTION_CONFIRM_DEACTIVATE = '¿Deseas desactivar el usuario?';
const TITLE_CONFIRM_ACTIVATE = '¡Espera!';
const DESCRIPTION_CONFIRM_ACTIVATE = '¿Deseas reactivar el usuario?';
const CONFIRM_BUTTON = 'Continuar';
const CANCEL_BUTTON = 'Cancelar';
const TITLE_SUCCESS_ADD = '¡Bien!';
const DESCRIPTION_SUCCESS_ADD = 'El usuario se ha añadido.';
const DESCRIPTION_SUCCESS_EDIT = 'El usuario se ha modificado.';
const DESCRIPTION_SUCCESS_DEACTIVATE = 'El usuario se ha desactivado.';
const DESCRIPTION_SUCCESS_ACTIVATE = 'El usuario se ha activado.';
const TITLE_ERROR = 'Ups!';
const DESCRIPTION_ERROR = 'Ha ocurrido un problema interno, intenta de nuevo más tarde.';
const REGEX_DATE = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const TITLE_LOADING = 'Por favor, espera...'

window.onload = _ => {

    startTable();
    startSearch();

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
        searchByRole(evt.target.value);
        formHandler.clear();
        btnClose.click();
    });

    picture.addEventListener('change', evt => {

        let imgPrev = document.getElementById('img__prev');

        var reader = new FileReader();

        reader.onloadend = function() {
            imgPrev.style.display = 'block';
            imgPrev.setAttribute('src', reader.result);
        }
        let file = evt.target.files[0];
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }

    })

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
        let imgPrev = document.getElementById('img__prev');
        imgPrev.style.display = 'none';
        imgPrev.setAttribute('src', '');
        formHandler.clear();
    });


    btnGuardar.addEventListener('click', async _ => {

        if (editMode) {
            editCallback();
            return;
        }

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

        //Muestra loader en lo que se completa la request
        getSwalLoader();

        let picUrl = await uploadPic(picture.files[0]);

        newUser = {
            ...newUser,
            'status': 1,
            'statusUser': 1,
            'picture': picUrl.url,
            'creado_en': 'QuestionMe!'
        };

        add(newUser)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                const RESULT = {
                    'OK': data => {
                        Swal.fire({
                            icon: 'success',
                            title: TITLE_SUCCESS_ADD,
                            text: DESCRIPTION_SUCCESS_ADD
                        });
                        // formHandler.changeDisabledAll(false);
                        // formHandler.setFromObject(data.data);
                        searchByRole(roleSelect.value);
                        btnClose.click();
                    },
                    'error': data => {

                        Swal.fire({
                            icon: 'error',
                            title: TITLE_ERROR,
                            text: data.response
                        });
                    }
                };
                (RESULT[data.status] || RESULT['error'])(data);

            })
            .catch(err => {
                console.log(err);
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

        if (editMode) {
            btnGuardar.innerText = 'Guardar';
            editMode = false;
            userEdit = {};
            btnClose.click();
        }

    });

}

//:::::::::::::::::::::::::::::::::::::::
//::::::::::::::: TABLA :::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::

let startTable = () => {
    tableController = new Table(document.getElementById('main-table'));
}

let startSearch = _ => {
    tableController.setInputSearch(document.getElementById('txtTableSearch'));
}

let addDataToList = (userList) => {

    if (!tableController) {
        startTable();
    }

    let inputSearch = document.getElementById('txtTableSearch');
    inputSearch.value = '';

    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("keyup", false, true);
    inputSearch.dispatchEvent(evt);

    tableController.clear();

    if (userList.length === 0) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.setAttribute('class', 'text-inactive');
        td.setAttribute('colspan', 7);
        td.innerText = 'No hay usuarios disponibles';
        tr.appendChild(td);
        document.getElementById('main-table').querySelector('tbody').appendChild(tr);
        tableController.restartData();
        return;
    }

    tableController.showData({
        data: userList,
        columns: [{
                funct: (value) => {
                    let img = document.createElement('img');
                    img.setAttribute('class', 'table-picture');
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
            { column: 'creado_en' },
            { column: 'roleName' },
            {
                funct: value => {
                    let lbl = document.createElement('label');
                    lbl.innerHTML = value['statusUser'] === 1 ? 'Activo' : 'Inactivo';
                    return lbl;
                }
            },
            {
                funct: (value) => {
                    let button = document.createElement('button');
                    button.setAttribute('class', 'table-btn btn-detail');
                    let img = document.createElement('img');
                    img.setAttribute('src', `${ASSETS_ROUTE}img/svg/icons/view.svg`);
                    button.appendChild(img);
                    button.addEventListener('click', () => {
                        //Activando modo de edición
                        editMode = true;
                        userEdit = value;
                        btnGuardar.innerText = 'Guardar cambios';
                        gsap.to(admPanel, {
                            duration: 0.2,
                            x: '0%',
                            display: 'block'
                        });

                        let setting = {...value };
                        delete setting.password;

                        let imgPrev = document.getElementById('img__prev');
                        imgPrev.style.display = 'block';
                        imgPrev.setAttribute('src', setting.picture);

                        delete setting.picture;

                        formHandler.setFromObject(setting);

                    })

                    return button;
                }
            },
            {
                funct: (value) => {
                    let button = document.createElement('button');
                    button.setAttribute('class', 'table-btn btn-detail');
                    let img = document.createElement('img');
                    let imgSrc = "";
                    let title = "";
                    value['statusUser'] === 1 ? imgSrc = `${ASSETS_ROUTE}img/svg/icons/trash.svg` : imgSrc = `${ASSETS_ROUTE}img/svg/icons/check.svg`;
                    value['statusUser'] === 1 ? title = `Desactivar` : title = `Activar`;

                    img.setAttribute('src', imgSrc);
                    img.setAttribute('title', title);

                    button.appendChild(img);

                    button.addEventListener('click', async() => {

                        if (value['statusUser'] === 1) {
                            removeCallback(value['id']);
                            return;
                        }

                        activateCallback(value['id']);


                    });

                    return button;
                }
            }
        ]
    });

}

//:::::::::::::::::::::::::::::::::::::::
//:::::::::::: MÉTODOS CRUD :::::::::::::
//:::::::::::::::::::::::::::::::::::::::

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

let edit = user => {

    return fetch(`${ASSETS_ROUTE}users/${user.id}`, {
        method: "PUT",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(user)
    });

};

let deactivate = id => {

    return fetch(`${ASSETS_ROUTE}users/desactivate/${id}`, {
        method: "POST"
    });

}

let activate = id => {

    return fetch(`${ASSETS_ROUTE}users/activate/${id}`, {
        method: "POST"
    });

}

let removeCallback = async id => {
    let result = await Swal.fire({
        icon: 'info',
        title: TITLE_CONFIRM_DEACTIVATE,
        text: DESCRIPTION_CONFIRM_DEACTIVATE,
        showCancelButton: true,
        cancelButtonColor: 'gray',
        cancelButtonColor: CANCEL_BUTTON,
        confirmButtonText: CONFIRM_BUTTON,
        confirmButtonColor: 'rgba(255,0,0,0.6)'
    });

    if (!result.isConfirmed) {
        return;
    }
    //Muestra loader en lo que se completa la request
    getSwalLoader();


    deactivate(id)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            const RESULT = {
                'OK': data => {

                    Swal.fire({
                        icon: 'success',
                        title: TITLE_SUCCESS_ADD,
                        text: DESCRIPTION_SUCCESS_DEACTIVATE,
                        confirmButtonText: CONFIRM_BUTTON,
                        confirmButtonColor: 'rgba(255,0,0,0.6)'
                    });
                    searchByRole(roleSelect.value);
                },
                'error': data => {

                    Swal.fire({
                        icon: 'error',
                        title: TITLE_ERROR,
                        text: data.response,
                        confirmButtonText: CONFIRM_BUTTON,
                        confirmButtonColor: 'rgba(255,0,0,0.6)'
                    });
                }
            };
            (RESULT[data.status] || RESULT['error'])(data);

        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: TITLE_ERROR,
                text: DESCRIPTION_ERROR
            });

        });
}

let activateCallback = async id => {
    let result = await Swal.fire({
        icon: 'info',
        title: TITLE_CONFIRM_ACTIVATE,
        text: DESCRIPTION_CONFIRM_ACTIVATE,
        showCancelButton: true,
        cancelButtonColor: 'gray',
        cancelButtonColor: CANCEL_BUTTON,
        confirmButtonText: CONFIRM_BUTTON,
        confirmButtonColor: 'rgba(255,0,0,0.6)'
    });

    if (!result.isConfirmed) {
        return;
    }

    //Muestra loader en lo que se completa la request
    getSwalLoader();

    activate(id)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            const RESULT = {
                'OK': data => {
                    Swal.fire({
                        icon: 'success',
                        title: TITLE_SUCCESS_ADD,
                        text: DESCRIPTION_SUCCESS_ACTIVATE,
                        confirmButtonText: CONFIRM_BUTTON,
                        confirmButtonColor: 'rgba(255,0,0,0.6)'
                    });
                    // formHandler.changeDisabledAll(false);
                    // formHandler.setFromObject(data.user);

                    searchByRole(roleSelect.value);
                },
                'error': data => {

                    Swal.fire({
                        icon: 'error',
                        title: TITLE_ERROR,
                        text: data.response,
                        confirmButtonText: CONFIRM_BUTTON,
                        confirmButtonColor: 'rgba(255,0,0,0.6)'
                    });
                }
            };
            (RESULT[data.status] || RESULT['error'])(data);

        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: TITLE_ERROR,
                text: DESCRIPTION_ERROR,
                confirmButtonText: CONFIRM_BUTTON,
                confirmButtonColor: 'rgba(255,0,0,0.6)'
            });

        });
}

let editCallback = async _ => {

    if (!formHandler) {
        startFormHandler()
    }
    // debugger
    if (!formHandler.check(['name', 'last_name', 'date_birth', 'picture', 'email', 'nameUser', 'role'])) {
        return;
    }

    let result = await Swal.fire({
        icon: 'info',
        title: TITLE_CONFIRM_ADD,
        text: DESCRIPTION_CONFIRM_EDIT,
        showCancelButton: true,
        cancelButtonColor: 'gray',
        cancelButtonColor: CANCEL_BUTTON,
        confirmButtonText: CONFIRM_BUTTON,
        confirmButtonColor: 'rgba(255,0,0,0.6)'

    });

    if (!result.isConfirmed) {
        return;
    }

    //Muestra loader en lo que se completa la request
    getSwalLoader();

    if (picture.files.length > 0) {
        var picUrl = await uploadPic(picture.files[0]);
    }

    let edited = {};
    let fromHandler = formHandler.getAsObject();

    Object.keys(fromHandler).forEach(key => {
        if (fromHandler[key].trim() !== '') {
            edited[key] = fromHandler[key];
        }
    });

    let modifiedUser = {
        ...userEdit,
        ...edited,
        'picture': picUrl ? picUrl.url : userEdit.picture
    }

    console.log(modifiedUser);

    edit(modifiedUser)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            const RESULT = {
                'OK': data => {
                    Swal.fire({
                        icon: 'success',
                        title: TITLE_SUCCESS_ADD,
                        text: DESCRIPTION_SUCCESS_EDIT
                    });
                    formHandler.setFromObject(data.data);
                    searchByRole(roleSelect.value);
                    //Salir del modo edición
                    btnGuardar.innerText = 'Guardar';
                    editMode = false;
                    userEdit = {};
                    btnClose.click();
                },
                'error': data => {

                    Swal.fire({
                        icon: 'error',
                        title: TITLE_ERROR,
                        text: data.response
                    });
                }
            };

            (RESULT[data.status] || RESULT['error'])(data);

        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: TITLE_ERROR,
                text: DESCRIPTION_ERROR
            });

        });



};

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

let searchByRole = roleId => {

    if (!tableController) {
        startTable();
    }

    tableController.showLoader(7);

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

//:::::::::::::::::::::::::::::::::::::::
//::::::::::::::: FORM ::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::

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

//::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::OTROS:::::::::::::::
//::::::::::::::::::::::::::::::::::::::


let getSwalLoader = _ => {
    return Swal.fire({
        title: TITLE_LOADING,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onOpen: () => {
            swal.showLoading();
        }
    });
}