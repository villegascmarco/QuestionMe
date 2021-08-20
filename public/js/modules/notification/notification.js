console.log('works!!!')


window.onload = () => {
    var pusher = new Pusher("APP_KEY", {
        cluster: "APP_CLUSTER",
    });

    var channel = pusher.subscribe("my-channel");

    channel.bind("my-event", (data) => {

    });
}