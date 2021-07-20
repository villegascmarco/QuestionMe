class Wizard {
    element;
    wizardSteps;
    currentPosition = 0;

    constructor(element) {
        this.element = element;
        this.wizardSteps = Array.from(this.element.querySelectorAll('.wizard-step'));
        console.log(this.wizardSteps);
        this.startWizard();
    }

    startWizard() {
        this.wizardSteps[0].classList.add('active');
    }

    nextStep() {
        if (this.currentPosition < this.wizardSteps.length) {
            this.currentPosition++;
        }

        if ((this.currentPosition - 1) >= 0) {
            this.wizardSteps[this.currentPosition - 1].classList.remove('active');
        }

        this.wizardSteps[this.currentPosition].classList.add('active');
    }

    previousStep() {
        if ((this.currentPosition - 1) >= 0) {
            this.currentPosition--;
        }
        this.wizardSteps[this.currentPosition + 1].classList.remove('active');
        this.wizardSteps[this.currentPosition].classList.add('active');
    }
}