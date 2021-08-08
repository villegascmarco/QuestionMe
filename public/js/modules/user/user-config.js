let id = 0;
let nameTxt = document.getElementById('name')
let roleTxt = document.getElementById('role')
let userNameTxt = document.getElementById('user-name')
let emailTxt = document.getElementById('email')
let imgProfile = document.getElementById('imgProfile')

let btnEditUserName = document.getElementById('btnEditUserName')
let btnEditMail = document.getElementById('btnEditMail')
let btnEditPassword = document.getElementById('btnEditPassword')
let btnEditPicture = document.getElementById('btnEditPicture')
let btnDeactivate = document.getElementById('btnDeactivate')

const ROLE_USER = 'Usuario regular';
const ROLE_ADMIN = 'Administrador 😎';
const TITLE_LOADING = 'Por favor, espera...';
const TITLE_CONFIRM_DEACTIVATE = '¡Cuidado!';
const TITLE_CONFIRM_ACTIVATE = '¡Espera!';
const TITLE_SUCCESS = '¡Bien!';
const TITLE_ERROR = 'Ups!';
const DESCRIPTION_ERROR = 'Ha ocurrido un problema interno, intenta de nuevo más tarde.';
const DESCRIPTION_SUCCESS = 'Se ha modificado';
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let userData = {};

window.onload = async _ => {
    addSkeletons();

    userData = await getData();
    console.log(userData);
    putData(userData);

    btnEditUserName.onclick = editUserName;
    btnEditMail.onclick = editMail;
    btnEditPassword.onclick = () => editPassword();
    btnEditPicture.onclick = editPicture;
    btnDeactivate.onclick = deactivateAccount;

}

let editUserName = async _ => {
    let result = await Swal.fire({
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
    })

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
        putData(userData);
    }
    Swal.fire({
        icon: response.status === 'OK' ? 'success' : 'error',
        title: response.status === 'OK' ? TITLE_SUCCESS : TITLE_ERROR,
        text: response.status === 'OK' ? `${DESCRIPTION_SUCCESS} el nombre de usuario` : DESCRIPTION_ERROR,
        confirmButtonColor: 'rgba(255,0,0,0.6)',
    });
}

let editPassword = async(error = '') => {

        let result = await Swal.fire({
                    title: 'Cambia el email',
                    html: `
                <div class="qme-input special-login margin-top-25">            
                    <label class="label">Contraseña actual</label>      
                    <input class="input" name="confirmPassword" id="swalConfirmPassword" type="password" autocomplete="off" form-message="Por favor, ingresa la contraseña anterior">
                    ${error !== ''?`<div class="qme-alert-form">${error}</div>`:''}
                </div>
                <div class="qme-input special-login margin-top-25">            
                    <label class="label">Nueva contraseña</label>      
                    <input class="input" name="password" id="swalPassword" type="password" autocomplete="off" form-message="Por favor, ingresa una nueva contraseña">
                </div>
                `,
        confirmButtonText: 'Guardar',
        confirmButtonColor: 'rgba(255,0,0,0.6)',
        focusConfirm: false,
        preConfirm: async() => {
            const confirmPassword = Swal.getPopup().querySelector('#swalConfirmPassword').value
            const password = Swal.getPopup().querySelector('#swalPassword').value

            if (confirmPassword === '') {
                addWarn(Swal.getPopup().querySelector('#swalConfirmPassword'));
                return false;
            }

            if (password === '') {
                addWarn(Swal.getPopup().querySelector('#swalPassword'));
                return false;
            }

            return {
                confirmPassword: confirmPassword,
                password: password
            };
        }
    });

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
        ...result.value
    }

    let response = await edit(modifiedUser);

    if (response.status === 'error' && response.statusCode == '001') {            
        editPassword('La contraseña ingresada no es correcta');            
        return;
    }

    if (response.status === 'OK') {
        userData = modifiedUser;
        delete userData.confirmPassword;
        delete userData.password;
        putData(userData);
    }

    Swal.fire({
        icon: response.status === 'OK'? 'success':'error',
        title: response.status === 'OK' ? TITLE_SUCCESS : TITLE_ERROR,
        text: response.status === 'OK' ? `${DESCRIPTION_SUCCESS} la contraseña` : DESCRIPTION_ERROR,
        confirmButtonColor: 'rgba(255,0,0,0.6)',
    });
}

let editMail = async _ => {
    let result = await Swal.fire({
        title: 'Cambia el email',
        html: `<div class="qme-input special-login margin-top-25">            
                    <label class="label">Nuevo email</label>      
                    <input class="input" name="email" id="swalEmail" type="email" autocomplete="off" form-message="Por favor, ingresa un mail válido" value="${userData.email}">
                </div>`,
        confirmButtonText: 'Guardar',
        confirmButtonColor: 'rgba(255,0,0,0.6)',
        focusConfirm: false,
        preConfirm: async() => {
            const email = Swal.getPopup().querySelector('#swalEmail').value

            if (email === '' || !REGEX_EMAIL.test(String(email).toLowerCase())) {
                addWarn(Swal.getPopup().querySelector('#swalEmail'));
                return false;
            }

            if (await emailTaken(email)) {
                addWarn(Swal.getPopup().querySelector('#swalEmail'), 'Ese correo electrónico ya está en uso');
                return false;
            }

            return email;
        }
    });
     
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
        email: result.value
    }

    let response = await edit(modifiedUser);
    if (response.status === 'OK') {
        userData = modifiedUser;
        putData(userData);
    }
    Swal.fire({
        icon: response.status === 'OK'? 'success':'error',
        title: response.status === 'OK' ? TITLE_SUCCESS : TITLE_ERROR,
        text: response.status === 'OK' ? `${DESCRIPTION_SUCCESS} el correo electrónico` : DESCRIPTION_ERROR,
        confirmButtonColor: 'rgba(255,0,0,0.6)',
    });
}

let callSwalSelectFile = ()=>{
    let swalImgProfile = document.getElementById('swalImgProfile');
    let swalFileSelect = document.getElementById('swalFileSelect');

    swalFileSelect.onchange = (evt) =>{

        let file = evt.target.files[0];
        if(!file) return;
        var reader = new FileReader();

        reader.onloadend = function() {        
            swalImgProfile.setAttribute('src', reader.result);
        }

        reader.readAsDataURL(file);;

    };

    swalFileSelect.click();

};

let editPicture = async _ => {
    let result = await Swal.fire({
        title: 'Cambia tu foto',
        html: `<figure class="user-profile-pic edit">
                    <button id="swalBtnImage" onclick="callSwalSelectFile()">
                        <img src="${userData.picture}" alt="" id="swalImgProfile">
                        <label>Seleccionar un archivo</label>
                    </button>
                    <input type="file" id="swalFileSelect" accept=".jpg,.png">
                </figure>`,
        confirmButtonText: 'Guardar',
        confirmButtonColor: 'rgba(255,0,0,0.6)',
        focusConfirm: false,
        preConfirm: async() => {
            const file = Swal.getPopup().querySelector('#swalFileSelect').files[0]

            if (!file) {                
                return false;
            }

            return file;
        }
    });
     
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
    debugger
    let picture = await uploadPic(result.value);

    let modifiedUser = {
        ...userData,
        picture: picture.url
    }
    
    let response = await edit(modifiedUser);

    if (response.status === 'OK') {
        userData = modifiedUser;
        putData(userData);
    }

    Swal.fire({
        icon: response.status === 'OK'? 'success':'error',
        title: response.status === 'OK' ? TITLE_SUCCESS : TITLE_ERROR,
        text: response.status === 'OK' ? `${DESCRIPTION_SUCCESS} la fotografía` : DESCRIPTION_ERROR,
        confirmButtonColor: 'rgba(255,0,0,0.6)',
    });
}

let deactivateAccount = async _ =>{
    let result = await Swal.fire({
        title: userData.statusUser===1 ? TITLE_CONFIRM_DEACTIVATE: TITLE_CONFIRM_ACTIVATE,
        html: userData.statusUser===1? `Esta acción es irreversible, ¿Deseas continuar?`: 'Deseas reactivar tu cuenta',
        confirmButtonText: userData.statusUser ? 'Desactivar mi cuenta':'Reactivar mi cuenta',
        confirmButtonColor: 'rgba(255,0,0,0.6)',
        focusConfirm: false,        
    });

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
        statusUser: userData.statusUser ? 0:1
    }

    let response = await edit(modifiedUser);

    if (response.status === 'OK') {
        userData = modifiedUser;
        putData(userData);
    }

    result = await Swal.fire({
        icon: response.status === 'OK'? 'success':'error',
        title: response.status === 'OK' ? TITLE_SUCCESS : TITLE_ERROR,
        text: response.status === 'OK' ? `Has ${userData.statusUser=== 0 ? 'desactivado':'activado'} tu cuenta${userData.statusUser===0?', te redireccionamos a la pantalla de login':''}` : DESCRIPTION_ERROR,
        confirmButtonColor: 'rgba(255,0,0,0.6)',
    });

    if(userData.statusUser===1) {
        location.reload()
        return;
    }

    window.location = `${ASSETS_ROUTE}logout`;

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

let emailTaken = async email => {
    let response = await fetch(`${ASSETS_ROUTE}users/emailUsedExceptSelf/${userData.id}/${email}`)
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