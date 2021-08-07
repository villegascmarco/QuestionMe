var time = 5000;//milliseconds
var index = 0;
var container = $(".box");
var childrenCount = $(".section").length;
function slideToNext() {

    index = (index + 1) % childrenCount;
    console.log(index);
    container.css({
        marginLeft: -1 * index * 100 + "%"
    })
}
var pt = window.setInterval(function() {
    slideToNext();
}, time)