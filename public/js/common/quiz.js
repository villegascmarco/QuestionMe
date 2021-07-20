let carousel = document.getElementById('carousel');

new CardCarousel(carousel);
let wizard = new Wizard(document.getElementById('step-wizard'));


carousel.addEventListener('progress', (evt) => {
    if (evt.detail.direction === 'FORWARD') {
        wizard.nextStep();
    } else {
        wizard.previousStep();
    }
})