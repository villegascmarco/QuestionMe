let btnGoogle = document.getElementById('loginGoogle');
let btnFacebook = document.getElementById('loginFacebook');
let btnSignUp = document.getElementById('btnSignUp');
let email = document.getElementById('email');
let password = document.getElementById('password');
let nameUser = document.getElementById('nameUser');
// let email = document.getElementById('email');
let confirmPassword = document.getElementById('confirm-password');
let inputContainer = document.getElementById('loginContainer');
let formHandler = null;
let socMedError = document.getElementById('socMedError');
let validForm = true;

const auth = firebase.auth();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const REGEX_DATE = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const BUTTON_TEXT = 'Registrarme';
const IMG_LOADER = `${ASSETS_ROUTE}img/svg/icons/loading-animated.svg`;
const CRED_ERROR = 'Parece que los datos ingresados no son correctos, intenta de nuevo';
const FACEBOOK_ERROR = 'Parece que hay un problema al ingresar con facebook, intenta de nuevo más tarde';
const GOOGLE_ERROR = 'Parece que hay un problema al ingresar con google, intenta de nuevo más tarde';
let LOADER = null;
const IMG_DEFAULTS = ['https://i.imgur.com/sevGHor.png', 'https://i.imgur.com/IelBGCS.png'];

window.onload = _ => {

    LOADER = document.createElement('img');
    LOADER.setAttribute('src', IMG_LOADER);
    LOADER.setAttribute('height', '45px');

    startFormHandler();

    confirmPassword.addEventListener('keyup', _ => checkingPassword(confirmPassword));

    btnSignUp.addEventListener('click', _ => {
        signUp();
    })
    btnGoogle.addEventListener('click', _ => {
        loginGoogle();
    })
    btnFacebook.addEventListener('click', _ => {
        loginFacebook();
    })

    nameUser.addEventListener('keyup', async evt => {
        userNameTaken(evt.target.value);
    });

    email.addEventListener('keyup', async evt => {
        emailTaken(evt.target.value);
    });
}

let signUp = async _ => {

    socMedError.style.display = 'none';

    if (!formHandler) startFormHandler();
    userNameTaken(nameUser.value);
    emailTaken(email.value);
    if (!formHandler.checkForm()) return;



    let user = formHandler.getAsObject();

    if (user['password'] !== user['confirm-password']) {
        confirmPassword.focus();
        formHandler.showError('confirm-pasword', 'Las contraseñas no coinciden')
        return;
    }

    animateButton('loading');
    changeDisabled(true);

    user = {
        ...user,
        picture: IMG_DEFAULTS[Math.floor(Math.random() * 2)],
        creado_en: 'QuestionMe!',
        role: 1,
        status: 1,
        statusUser: 1
    }

    let responseAdd = await requestSignUp(user);
    responseAdd = await responseAdd.json();

    if (responseAdd.status === "OK") {
        window.location = `${ASSETS_ROUTE}dashboard`;
    }
    if (responseAdd.status === 'error') {
        changeDisabled(false);
        socMedError.innerText = GOOGLE_ERROR;
        socMedError.style.display = 'block';
    }

    try {

    } catch (error) {
        console.log(error);
    }


}


let loginGoogle = async _ => {
    changeDisabled(true);
    socMedError.style.display = 'none';
    try {
        let response = await auth.signInWithPopup(googleProvider);

        let userInfo = response.additionalUserInfo.profile;

        let newUser = {
            id: userInfo['id'],
            name: userInfo['given_name'],
            last_name: userInfo['family_name'],
            picture: userInfo['picture'],
            date_birth: `2000-01-01`,
            nameUser: userInfo['name'],
            email: userInfo['email'],
            creado_en: 'Google',
            role: 1,
            status: 1,
            statusUser: 1,
        }

        let responseAdd = await requestLoginSocialMedia(newUser);
        responseAdd = await responseAdd.json();
        if (responseAdd.status === "OK") {
            window.location = `${ASSETS_ROUTE}dashboard`;
        }
        if (responseAdd.status === 'error') {
            changeDisabled(false);
            socMedError.innerText = GOOGLE_ERROR;
            socMedError.style.display = 'block';
        }

    } catch (error) {
        console.log(error)
    }

}

let loginFacebook = async _ => {
    changeDisabled(true);

    socMedError.style.display = 'none';
    try {
        let response = await auth.signInWithPopup(facebookProvider);

        let userInfo = response.additionalUserInfo.profile;

        let bdayArray = String(userInfo.birthday).split('/');
        // let userName = searchAvailableUser(userInfo['name']);

        let newUser = {
            id: userInfo['id'],
            name: userInfo['first_name'],
            last_name: userInfo['last_name'],
            picture: userInfo['picture']['data']['url'],
            date_birth: `${bdayArray[2]}-${bdayArray[0]}-${bdayArray[1]}`,
            nameUser: userInfo['name'],
            email: userInfo['email'],
            creado_en: 'Facebook',
            role: 1,
            status: 1,
            statusUser: 1,
        }
        let responseAdd = await requestLoginSocialMedia(newUser);
        responseAdd = await responseAdd.json();
        if (responseAdd.status === "OK") {
            window.location = `${ASSETS_ROUTE}dashboard`;
        }
        if (responseAdd.status === 'error') {
            changeDisabled(false);
            socMedError.innerText = FACEBOOK_ERROR;
            socMedError.style.display = 'block';
        }

    } catch (error) {
        console.log(error)
    }

}

let requestSignUp = newUser => {

    return fetch(`${ASSETS_ROUTE}registration`, {
        method: 'POST',
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(newUser)
    })

}

let requestLoginSocialMedia = requestUser => {

    return fetch(`${ASSETS_ROUTE}authenticateWithSocialMedia`, {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(requestUser)
    });

}

let isUserNameTaken = async name => {

    return fetch(`${ASSETS_ROUTE}users/userNameTaken/${name}`);

}

let isEmailTaken = async email => {

    return fetch(`${ASSETS_ROUTE}users/emailUsed/${email}`);

}

let userNameTaken = async name => {
    let response = await isUserNameTaken(name);
    response = await response.json();

    if (response.response) {
        nameUser.focus();
        formHandler.showError('nameUser', 'El nombre de usuario no está disponible ')
        validForm = false;
        return;
    }
    formHandler.removeError('nameUser');
    validForm = true;
}

let emailTaken = async mail => {
    let response = await isEmailTaken(mail);

    response = await response.json();

    if (response.response) {
        email.focus();
        formHandler.showError('email', 'El correo ya está en uso')
        validForm = false;
        return;
    }
    formHandler.removeError('email');
    validForm = true;
}


let searchAvailableUser = async originName => {

        if (isUserNameTaken(originName)) {
            let test = 0;
            originName = `${originName} ${++test}`
            while (isUserNameTaken(originName)) {
                originName = `${originName} ${++test}`
            }
        }

        return originName;

    }
    //:::::::::::::::::::::::::::::::::::::::
    //::::::::::::::: FORM ::::::::::::::::::
    //:::::::::::::::::::::::::::::::::::::::

let startFormHandler = _ => {
    var elList = Array.from(inputContainer.querySelectorAll('input, select, textarea'));
    var validations = {
        'name': val => val.trim() !== '',
        'last_name': val => val.trim() !== '',
        'date_birth': val => REGEX_DATE.test(val),
        'email': val => {


            return REGEX_EMAIL.test(String(val).toLowerCase())


        },
        'nameUser': val => val.trim() !== '',
        'password': val => val !== '',
        'confirm-pasword': val => val.trim() !== '',
    };

    formHandler = new FormsValidator(elList, validations);

}

let animateButton = (state = 'loading') => {
    if (state === 'loading') {
        btnSignUp.innerHTML = '';
        btnSignUp.appendChild(LOADER);
        gsap.to(btnSignUp, {
            duration: 0.05,
            width: '60px',
            height: '60px',
            backgroundColor: '#fa4639'
        });
        return;
    }

    btnSignUp.innerHTML = '';
    btnSignUp.innerText = BUTTON_TEXT;
    gsap.to(btnSignUp, {
        duration: 0.05,
        width: '200px',
        height: 'auto',
        backgroundColor: '#fff'
    });
}


let changeDisabled = disabled => {
    btnGoogle.disabled = disabled;
    btnFacebook.disabled = disabled;
    btnSignUp.disabled = disabled;
}

let checkingPassword = el => {

    let user = formHandler.getAsObject();

    let alertInserted = el.parentNode.querySelector('.qme-alert-form');
    if (alertInserted) alertInserted.parentNode.removeChild(alertInserted);

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