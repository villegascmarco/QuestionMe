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
        console.log(response);
    } catch (error) {
        console.log(error)
    }

};

let loginFacebook = async _ => {

    try {
        let response = await auth.signInWithPopup(facebookProvider);
        console.log(response);
    } catch (error) {
        console.log(error)
    }

};