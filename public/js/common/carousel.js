class CardCarousel {

    element;
    carouselCards;
    currentPosition = 0;
    btnNext;
    btnPrev;

    constructor(element) {
        this.element = element;
        this.carouselCards = Array.from(this.element.querySelectorAll('.card'));
        this.carouselCards[0].classList.add('current')
        this.createButtons();
    }

    createButtons() {
        this.btnNext = document.createElement('button');
        this.btnPrev = document.createElement('button');
        let btnContainer = document.createElement('div');

        btnContainer.setAttribute('class', 'carousel-button-container');

        this.btnNext.setAttribute('class', 'qme-button btn-carousel red margin-left-25');
        this.btnNext.innerText = 'Siguiente';
        this.btnNext.addEventListener('click', () => {
            if (this.currentPosition < this.carouselCards.length) {
                ++this.currentPosition;
            }
            // debugger
            if (this.currentPosition === (this.carouselCards.length - 1)) {
                this.btnNext.disabled = true;
            }
            if (this.currentPosition > 0) {
                this.btnPrev.disabled = false;
            }
            this.updateProgress(true);
        });
        this.btnPrev.setAttribute('class', 'qme-button btn-carousel simple margin-left-25');
        this.btnPrev.innerText = 'Anterior';
        this.btnPrev.disabled = true;
        this.btnPrev.addEventListener('click', () => {
            if ((this.currentPosition - 1) >= 0) {
                --this.currentPosition;
            }
            if (this.currentPosition < (this.carouselCards.length - 1)) {
                this.btnNext.disabled = false;
            }
            if (this.currentPosition === 0) {
                this.btnPrev.disabled = true;
            }
            this.updateProgress(false);
        });
        btnContainer.appendChild(this.btnPrev);
        btnContainer.appendChild(this.btnNext);
        this.element.appendChild(btnContainer);

    }

    updateProgress(forward = true) {
        if (forward) {
            this.carouselCards[this.currentPosition - 1].classList.remove('current');
        } else {
            this.carouselCards[this.currentPosition + 1].classList.remove('current');
        }

        this.carouselCards[this.currentPosition].classList.add('current');

        this.element.dispatchEvent(new CustomEvent("progress", {
            detail: {
                direction: forward ? "FORWARD" : "REVERSE"
            }
        }))
    }


}