let openMenu = document.getElementById('openMenu')
let dropMenu = document.getElementById('dropMenu')
let notificationCount = document.getElementById('notificationCount')
let dropNotification = document.getElementById('dropNotification')
let dropMenuNotification = document.getElementById('dropMenuNotification')

let userData = {}
let notifications = []

window.onload = () => {

    getNotifications()

}

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
        dropMenuNotification.classList.remove('active')
        return;
    }
    dropMenuNotification.classList.add('active')
})


let closeAll = () => {
    dropMenuNotification.classList.remove('active')
    dropMenu.classList.remove('active')
}

let getNotifications = async() => {

    userData = await getSelfData()
    if (!userData) return;

    let response = await fetch(`${ASSETS_ROUTE}notifications/${userData.id}`)
    response = await response.json()

    notifications = response

    console.log(notifications)

    if (notifications.length > 0) {
        notificationCount.classList.add('active')
        notificationCount.innerText = notifications.length < 10 ? notifications.length : '+9'
        fillNotifications()
    }

};

let fillNotifications = () => {

    dropMenuNotification





    notifications.forEach(notification => {

        let li = document.createElement('li')
        li.classList.add('notification-body')
        li.classList.add('new')
        let a = document.createElement('a')
        a.innerText = notification.data.message
        let button = document.createElement('button')
        button.classList.add('closeNotification')

        li.append(a)
        li.append(button)
        dropMenuNotification.append(li)

    })


}


let getSelfData = () => {
    return fetch(`${ASSETS_ROUTE}getSelfData`)
        .then(resp => resp.json())
};