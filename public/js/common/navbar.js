let openMenu = document.getElementById('openMenu')
let dropMenu = document.getElementById('dropMenu')
let notificationCount = document.getElementById('notificationCount')
let dropNotification = document.getElementById('dropNotification')
let dropMenuNotification = document.getElementById('dropMenuNotification')
let markAsRead = document.getElementById('markAsRead')


let user = {}
let notifications = []


window.addEventListener('load', async() => {

    user = await getSelfData()

    Echo.private(`App.Models.User.${user.id}`)
        .notification(notification => {

            var audio = new Audio('../../audio/notification.ogg');
            audio.play();

            getNotifications()

        })

    getNotifications()
})

markAsRead.addEventListener('click', async() => {

    let response = await markNotificationsAsRead()

    getNotifications()

});

openMenu.addEventListener('click', () => {
    // closeAll()
    if (dropMenu.classList.contains('active')) {
        dropMenu.classList.remove('active');
        return;
    }
    dropMenu.classList.add('active')
})
dropNotification.addEventListener('click', () => {
    // closeAll(


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

    if (!user) return;

    let response = await fetch(`${ASSETS_ROUTE}users/${user.id}/notifications`);

    notifications = await response.json()

    if (notifications.length > 0) {
        notificationCount.classList.add('active')
        notificationCount.innerText = notifications.length < 10 ? notifications.length : '+9'
        fillNotifications()
        return
    }
    if (notificationCount.classList.contains('active')) notificationCount.classList.remove('active')
    notificationCount.innerText = ''

    dropMenuNotification.querySelector('#notificationsContainer').innerHTML = ""

    let li = document.createElement('li')
    li.classList.add('notification-body')
    let a = document.createElement('a')
    a.innerText = 'No hay notificaciones pendientes'

    li.append(a)

    dropMenuNotification.querySelector('#notificationsContainer').append(li)


    markAsRead.disabled = true


};

let fillNotifications = () => {

    dropMenuNotification.querySelector('#notificationsContainer').innerHTML = ""

    notifications.forEach(notification => {

        let li = document.createElement('li')
        li.classList.add('notification-body')
        if (!notification.read_at) li.classList.add('new')
        let a = document.createElement('a')
        a.innerText = notification.data.message
        let button = document.createElement('button')
        button.classList.add('closeNotification')

        button.onclick = removeNotification(notification.id);

        li.append(a)
        li.append(button)
        dropMenuNotification.querySelector('#notificationsContainer').append(li)

    })

    markAsRead.disabled = false
}


let removeNotification = async id => {
    let response = fetch(`${ASSETS_ROUTE}users/${user.id}/notifications/${id}`, {
        method: "PUT"
    }).then(resp => resp.json())

    if (response.status === 'OK') {
        getNotifications()
    }
};


let getSelfData = () => {
    return fetch(`${ASSETS_ROUTE}getSelfData`)
        .then(resp => resp.json())
};

let markNotificationsAsRead = () => {
    return fetch(`${ASSETS_ROUTE}users/${user.id}/notifications/*`, {
        method: "PUT"
    }).then(resp => resp.json())
}