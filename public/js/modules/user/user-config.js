let id = 0;
let nameTxt = document.getElementById('name')
let roleTxt = document.getElementById('role')
let userNameTxt = document.getElementById('user-name')
let emailTxt = document.getElementById('email')
let imgProfile = document.getElementById('imgProfile')

let btnEditUserName = document.getElementById('btnEditUserName')
let btnEditMail = document.getElementById('btnEditMail')
let btnEditPassword = document.getElementById('btnEditPassword')
let btnDeactivate = document.getElementById('btnDeactivate')

const ROLE_USER = 'Usuario regular';
const ROLE_ADMIN = 'Administrador 😎';
const TITLE_LOADING = 'Por favor, espera...';
const TITLE_SUCCESS = '¡Bien!';
const DESCRIPTION_SUCCESS = 'Se ha modificado el campo';

let userData = {};

window.onload = async _ => {
    addSkeletons();

    userData = await getData();
    console.log(userData);
    putData(userData);

    btnEditUserName.onclick = editUserName;

}


let editUserName = _ => {
    Swal.fire({
        title: 'Cambia el nombre de usuario',
        html: `<div class="qme-input special-login margin-top-25">            
                    <label class="label">Nuevo nombre de usuario</label>      
                    <input class="input" name="nameUser" id="swalNameUser" type="text" autocomplete="off" form-message="Por favor, ingresa el nombre" value="${userData.nameUser}">
                </div>`,
        confirmButtonText: 'Guardar',
        confirmButtonColor: 'rgba(255,0,0,0.6)',
        focusConfirm: false,
        preConfirm: async() => {
            const nameUser = Swal.getPopup().querySelector('#swalNameUser').value

            if (nameUser === '') {
                addWarn(Swal.getPopup().querySelector('#swalNameUser'));
                return false;
            }

            if (await userNameTaken(nameUser)) {
                addWarn(Swal.getPopup().querySelector('#swalNameUser'), 'Ese nombre de usuario ya está en uso');
                return false;
            }

            return nameUser;
        }
    }).then(async(result) => {
        console.log(result)
        if (!result.isConfirmed) return;
        Swal.fire({
            title: TITLE_LOADING,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            onOpen: () => {
                swal.showLoading();
            }
        });

        let modifiedUser = {
            ...userData,
            nameUser: result.value
        }
        let response = await edit(modifiedUser);

        if (response.status === 'OK') {
            userData = modifiedUser;
            Swal.fire({
                icon: 'success',
                title: TITLE_SUCCESS,
                text: DESCRIPTION_SUCCESS,
                confirmButtonColor: 'rgba(255,0,0,0.6)',
            });
            putData(userData);
        }
    });
}

let putData = (data) => {
    removeSkeletons();
    imgProfile.src = data.picture;
    nameTxt.innerText = `${data.name} ${data.last_name}`;
    roleTxt.innerText = data.role === 1 ? ROLE_USER : ROLE_ADMIN;
    userNameTxt.innerText = data.nameUser;
    emailTxt.innerText = data.email;
};

let addSkeletons = () => {
    nameTxt.classList.add('skeleton')
    roleTxt.classList.add('skeleton')
    userNameTxt.classList.add('skeleton')
    emailTxt.classList.add('skeleton')
}

let removeSkeletons = _ => {
    nameTxt.classList.remove('skeleton')
    roleTxt.classList.remove('skeleton')
    userNameTxt.classList.remove('skeleton')
    emailTxt.classList.remove('skeleton')
}

let userNameTaken = async name => {
    let response = await fetch(`${ASSETS_ROUTE}users/userNameTakenExceptSelf/${userData.id}/${name}`)
        .then(resp => resp.json())

    return response.response;

}

let getData = () => {
    return fetch(`${ASSETS_ROUTE}getSelfData`)
        .then(resp => resp.json())
};

let edit = (user) => {
    return fetch(`${ASSETS_ROUTE}updateSelf`, {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify(user)
        })
        .then(resp => resp.json());
};

let addWarn = (el = null, message = '') => {

    if (el === null) return;

    let alertInserted = el.parentNode.querySelector('.qme-alert-form');

    if (alertInserted) {
        alertInserted.parentNode.removeChild(alertInserted);
    }

    var alert = document.createElement('div');
    alert.setAttribute('class', 'qme-alert-form');
    if (message === '')
        alert.innerText = el.getAttribute('form-message');
    else
        alert.innerText = message

    el.parentNode.appendChild(alert);
    el.focus();
}

let removeWarn = (name = null) => {

    if (name === null) return;

    let alertInserted = el.parentNode.querySelector('.qme-alert-form');

    if (alertInserted) {
        alertInserted.parentNode.removeChild(alertInserted);
    }

}