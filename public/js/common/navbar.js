let openMenu = document.getElementById('openMenu');
let dropMenu = document.getElementById('dropMenu')
let dropNotification = document.getElementById('dropNotification')
let dropMenuNotification = document.getElementById('dropMenuNotification')
openMenu.addEventListener('click', () => {
    // closeAll()
    if (dropMenu.classList.contains('active')) {
        dropMenu.classList.remove('active');
        return;
    }
    dropMenu.classList.add('active')
})
dropNotification.addEventListener('click', () => {
    // closeAll()
    if (dropMenuNotification.classList.contains('active')) {
        dropMenuNotification.classList.remove('active');
        return;
    }
    dropMenuNotification.classList.add('active')
})


let closeAll = () => {
    dropMenuNotification.classList.remove('active');
    dropMenu.classList.remove('active');
}