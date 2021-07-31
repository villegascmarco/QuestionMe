let tableController = null;
let admPanel = document.getElementById('adm-panel');
let btnShowPanel = document.getElementById('btn-show-panel');
let btnClose = document.getElementById('btn-close');
let btnGuardar = document.getElementById('btn-guardar');
let btnCancelar = document.getElementById('btn-cancelar');
let form = document.querySelector('form[name="main-form"]');
let confirmPassword = document.getElementById('confirm-password');
let formHandler = null;
let formOptions = {};
let categoryList = [];
let editMode = false;
let categoryEdit = {};


const TITLE_CONFIRM_ADD = '¡Espera!';
const DESCRIPTION_CONFIRM_ADD = '¿Deseas añadir la nueva categoría?';
const DESCRIPTION_CONFIRM_EDIT = '¿Deseas modificar la categoría?';
const TITLE_CONFIRM_DEACTIVATE = '¡Espera!';
const DESCRIPTION_CONFIRM_DEACTIVATE = '¿Deseas desactivar la categoría?';
const TITLE_CONFIRM_ACTIVATE = '¡Espera!';
const DESCRIPTION_CONFIRM_ACTIVATE = '¿Deseas reactivar la categoría?';
const CONFIRM_BUTTON = 'Continuar';
const CANCEL_BUTTON = 'Cancelar';
const TITLE_SUCCESS_ADD = '¡Bien!';
const DESCRIPTION_SUCCESS_ADD = 'La categoría se ha añadido.';
const DESCRIPTION_SUCCESS_EDIT = 'La categoría se ha modificado.';
const DESCRIPTION_SUCCESS_DEACTIVATE = 'La categoría se ha desactivado.';
const DESCRIPTION_SUCCESS_ACTIVATE = 'La categoría se ha activado.';
const TITLE_ERROR = 'Ups!';
const DESCRIPTION_ERROR = 'Ha ocurrido un problema interno, intenta de nuevo más tarde.';
const REGEX_DATE = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NO_DATA_TABLE_TEXT = 'No hay categorías disponibles';


const TITLE_LOADING = 'Por favor, espera...'

window.onload = _ => {

    startTable();

    startSearch();

    startFormHandler();

    //INICIAR BÚSQUEDA AL CARGAR LA PÁGINA    
    getList();
    // formHandler.clear();
    // btnClose.click();

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
        if (editMode) {
            btnGuardar.innerText = 'Guardar';
            editMode = false;
            categoryEdit = {};
        }
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

        let newCategory = formHandler.getAsObject();

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

        add(newCategory)
            .then(resp => resp.json())
            .then(data => {
                const RESULT = {
                    'OK': data => {
                        Swal.fire({
                            icon: 'success',
                            title: TITLE_SUCCESS_ADD,
                            text: DESCRIPTION_SUCCESS_ADD
                        });
                        getList();
                        btnClose.click();
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
            categoryEdit = {};
        }
        btnClose.click();

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

let addDataToList = (categoryList) => {

    if (!tableController) {
        startTable();
    }

    let inputSearch = document.getElementById('txtTableSearch');
    inputSearch.value = '';

    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("keyup", false, true);
    inputSearch.dispatchEvent(evt);

    tableController.clear();

    if (categoryList.length === 0) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.setAttribute('class', 'text-inactive');
        td.setAttribute('colspan', 7);
        td.innerText = NO_DATA_TABLE_TEXT;
        tr.appendChild(td);
        document.getElementById('main-table').querySelector('tbody').appendChild(tr);
        tableController.restartData();
        return;
    }

    tableController.showData({
        data: categoryList,
        columns: [{
                column: 'name'
            },
            {
                funct: value => {
                    let label = document.createElement('label');
                    label.innerText = value.status === 1 ? 'Activo' : 'Inactivo';
                    return label;
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
                        categoryEdit = value;
                        btnGuardar.innerText = 'Guardar cambios';
                        gsap.to(admPanel, {
                            duration: 0.2,
                            x: '0%',
                            display: 'block'
                        });

                        formHandler.setFromObject(value);

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
                    value['status'] === 1 ? imgSrc = `${ASSETS_ROUTE}img/svg/icons/trash.svg` : imgSrc = `${ASSETS_ROUTE}img/svg/icons/check.svg`;
                    value['status'] === 1 ? title = `Desactivar` : title = `Activar`;

                    img.setAttribute('src', imgSrc);
                    img.setAttribute('title', title);

                    button.appendChild(img);

                    button.addEventListener('click', async() => {

                        if (value['status'] === 1) {
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

let add = newCategory => {

    return fetch(`${ASSETS_ROUTE}categories`, {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(newCategory)
    });

}

let edit = category => {

    return fetch(`${ASSETS_ROUTE}categories/${category.id}`, {
        method: "PUT",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(category)
    });

};

let deactivate = id => {

    return fetch(`${ASSETS_ROUTE}categories/desactivate/${id}`, {
        method: "POST"
    });

}

let activate = id => {

    return fetch(`${ASSETS_ROUTE}categories/activate/${id}`, {
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
                    getList();
                },
                'error': data => {

                    Swal.fire({
                        icon: 'error',
                        title: TITLE_ERROR,
                        text: DESCRIPTION_ERROR,
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

                    getList();
                },
                'error': data => {

                    Swal.fire({
                        icon: 'error',
                        title: TITLE_ERROR,
                        text: DESCRIPTION_ERROR,
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
    if (!formHandler.checkForm()) {
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



    let fromHandler = formHandler.getAsObject();

    let modifiedCategory = {

        ...fromHandler,
        id: categoryEdit.id
    }

    edit(modifiedCategory)
        .then(resp => resp.json())
        .then(data => {
            const RESULT = {
                'OK': data => {
                    Swal.fire({
                        icon: 'success',
                        title: TITLE_SUCCESS_ADD,
                        text: DESCRIPTION_SUCCESS_EDIT
                    });
                    formHandler.setFromObject(data.data);
                    getList();
                    //Salir del modo edición
                    btnGuardar.innerText = 'Guardar';
                    editMode = false;
                    categoryEdit = {};
                    btnClose.click();
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

let getList = async _ => {

    if (!tableController) {
        startTable();
    }

    tableController.showLoader(7);

    let categoryList = await fetch(`${ASSETS_ROUTE}categories/`);

    categoryList = await categoryList.json();

    addDataToList(categoryList);

};

//:::::::::::::::::::::::::::::::::::::::
//::::::::::::::: FORM ::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::

let startFormHandler = _ => {
    var elList = Array.from(form.querySelectorAll('input, select, textarea'));
    var validations = {
        'name': val => val.trim() !== ''
    };

    formHandler = new FormsValidator(elList, validations);

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