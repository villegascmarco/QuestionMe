let carousel = document.getElementById('carousel');
let checkbox = document.getElementById('template-check')
let template = document.getElementById('template-section')

new CardCarousel(carousel);
let wizard = new Wizard(document.getElementById('step-wizard'));

let count = 0


checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        template.classList.remove('disable-template')
    } else {
        template.classList.add('disable-template')
    }
  });


carousel.addEventListener('progress', (evt) => {
    if (evt.detail.direction === 'FORWARD') {
        wizard.nextStep();
    } else {
        wizard.previousStep();
    }
})



