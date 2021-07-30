let btnGoogle = document.getElementById('loginGoogle');
let btnFacebook = document.getElementById('loginFacebook');
const auth = firebase.auth();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
window.onload = _ => {
    btnGoogle.addEventListener('click', _ => {
        loginGoogle();
    })
    btnFacebook.addEventListener('click', _ => {
        loginFacebook();
    })
}


let loginGoogle = async _ => {

    try {
        let response = await auth.signInWithPopup(googleProvider);


        //Login
        console.log(response)
        if (!response.additionalUserInfo.isNewUser) {
            console.log('No es nuevo')
        }
        //SignIn

        let userInfo = response.additionalUserInfo.profile;

        let newUser = {
            name: userInfo['given_name'],
            last_name: userInfo['family_name'],
            picture: userInfo['picture'],
            date_birth: `2000-01-01`,
            nameUser: userInfo['name'],
            email: userInfo['email'],
            password: userInfo['id'],
            creado_en: 'Google',
            role: 1,
            status: 1,
            statusUser: 1,
        }

        console.log(newUser);
    } catch (error) {
        console.log(error)
    }

};

let loginFacebook = async _ => {

    try {
        let response = await auth.signInWithPopup(facebookProvider);

        //Login
        console.log(response)
        if (!response.additionalUserInfo.isNewUser) {
            console.log('No es nuevo')
        }
        //SignIn

        let userInfo = response.additionalUserInfo.profile;

        let bdayArray = String(userInfo.birthday).split('/');
        // let userName = searchAvailableUser(userInfo['name']);

        let newUser = {
            name: userInfo['first_name'],
            last_name: userInfo['last_name'],
            picture: userInfo['picture']['data']['url'],
            date_birth: `${bdayArray[2]}-${bdayArray[0]}-${bdayArray[1]}`,
            nameUser: userInfo['name'],
            email: userInfo['email'],
            password: userInfo['id'],
            creado_en: 'Facebook',
            role: 1,
            status: 1,
            statusUser: 1,
        }

        console.log(newUser);
    } catch (error) {
        console.log(error)
    }

};

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