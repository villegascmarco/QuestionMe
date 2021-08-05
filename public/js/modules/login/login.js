let btnGoogle = document.getElementById('loginGoogle');
let btnFacebook = document.getElementById('loginFacebook');
let btnLogin = document.getElementById('login');
let email = document.getElementById('email');
let password = document.getElementById('password');
let inputContainer = document.getElementById('loginContainer');
let formHandler = null;
let credentialError = document.getElementById('credentialError');
let socMedError = document.getElementById('socMedError');

const auth = firebase.auth();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const BUTTON_TEXT = 'Iniciar sesión';
const IMG_LOADER = ``;
const CRED_ERROR = 'Parece que los datos ingresados no son correctos, intenta de nuevo';
const FACEBOOK_ERROR = 'Parece que hay un problema al ingresar con facebook, intenta de nuevo más tarde';
const GOOGLE_ERROR = 'Parece que hay un problema al ingresar con google, intenta de nuevo más tarde';
let LOADER = null;

window.onload = _ => {

    LOADER = document.createElement('img');
    LOADER.setAttribute('src', IMG_LOADER);
    LOADER.setAttribute('height', '45px');
    IMG_LOADER = `${ASSETS_ROUTE}img/svg/icons/loading-animated.svg`;

    startFormHandler();
    btnLogin.addEventListener('click', _ => {
        simpleLogin();
    })
    btnGoogle.addEventListener('click', _ => {
        loginGoogle();
    })
    btnFacebook.addEventListener('click', _ => {
        loginFacebook();
    })
}

let simpleLogin = async _ => {

    credentialError.style.display = 'none';
    socMedError.style.display = 'none';

    if (!formHandler) {
        startFormHandler();
    }

    if (!formHandler.checkForm()) {
        return;
    }

    animateButton('loading');
    changeDisabled(true);
    let credentials = formHandler.getAsObject();

    try {

        let response = await requestLogin(credentials);
        response = await response.json();


        if (response.status === "OK") {
            window.location = `${ASSETS_ROUTE}dashboard`;
        }

        if (response.status === 'error') {
            credentialError.style.display = 'block';
            animateButton('close');
            changeDisabled(false);
        }

    } catch (error) {
        console.log(error);
    }


}


let loginGoogle = async _ => {
    changeDisabled(true);
    credentialError.style.display = 'none';
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
    credentialError.style.display = 'none';
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

let requestLogin = credentials => {

    return fetch(`${ASSETS_ROUTE}auth`, {
        method: 'POST',
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(credentials)
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

    let response = await fetch(`${ASSETS_ROUTE}users/userNameTaken/${name}`);
    response = await response.json();

    if (response['status'] === 'OK') {

        return response['response'];
    }

    return false;
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
        'email': val => REGEX_EMAIL.test(String(val).toLowerCase()),
        'password': val => val.trim() !== '',
    };

    formHandler = new FormsValidator(elList, validations);

}

let animateButton = (state = 'loading') => {
    if (state === 'loading') {
        btnLogin.innerHTML = '';
        btnLogin.appendChild(LOADER);
        gsap.to(btnLogin, {
            duration: 0.05,
            width: '60px',
            height: '60px',
            backgroundColor: '#fa4639'
        });
        return;
    }

    btnLogin.innerHTML = '';
    btnLogin.innerText = BUTTON_TEXT;
    gsap.to(btnLogin, {
        duration: 0.05,
        width: '200px',
        height: 'auto',
        backgroundColor: '#fff'
    });
}


let changeDisabled = disabled => {
    btnGoogle.disabled = disabled;
    btnFacebook.disabled = disabled;
    btnLogin.disabled = disabled;
}