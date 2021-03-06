class FormsValidator {

    formElements = [];
    validations;

    constructor(formElements, validations = {}) {
        this.formElements = formElements;
        this.validations = {
            ...validations,
            default: val => {
                return val.trim !== '';
            }
        };

    }

    checkForm() {
        let response = true;
        this.formElements.forEach(el => {
            let alertInserted = el.parentNode.querySelector('.qme-alert-form');
            if (alertInserted) {
                alertInserted.parentNode.removeChild(alertInserted);
            }
            if (!this.searchOption(el)) {
                if (el.getAttribute('form-message')) {

                    var alert = document.createElement('div');
                    alert.setAttribute('class', 'qme-alert-form');
                    let message = el.getAttribute('form-message');
                    message.trim() !== '' ?
                        alert.innerText = message :
                        alert.innerText = 'Este campo es requerido';

                    el.parentNode.appendChild(alert);
                    el.focus();

                    return response = false;
                }
            }
        });
        return response
    }
    check(values = []) {
        let response = true;
        values.forEach(key => {

            let el = this.formElements.find(el => el.name === key);

            if (el) {
                let alertInserted = el.parentNode.querySelector('.qme-alert-form');
                if (alertInserted) {
                    alertInserted.parentNode.removeChild(alertInserted);
                }
                if (!this.searchOption(el)) {
                    if (el.getAttribute('form-message')) {

                        var alert = document.createElement('div');
                        alert.setAttribute('class', 'qme-alert-form');
                        let message = el.getAttribute('form-message');
                        message.trim() !== '' ?
                            alert.innerText = message :
                            alert.innerText = 'Este campo es requerido';

                        el.parentNode.appendChild(alert);
                        el.focus();

                        return response = false;
                    }
                }
            }
        });

        return response
    }

    searchOption(el) {
        return (this.validations[el.name] || this.validations['default'])(el.value)
    }

    clear() {
        const INPUT_TYPES = {
            'INPUT': el => el.value = '',
            'SELECT': el => el.value = 0,
            'TEXTAREA': el => el.value = ''
        };
        this.formElements.forEach(el => {
            console.log(el.tagName);

            (INPUT_TYPES[el.tagName] || INPUT_TYPES['INPUT'])(el);

        });
    }

    get(name = '') {
        return this.formElements.find(el => el.name === name).value;
    }

    getAsObject() {
        return this.formElements.reduce((obj, item) => {
            return {
                ...obj,
                [item.name]: item.value
            }
        }, {})
    }

    set(name = '', value = '') {
        this.formElements.find(el => el.name === name).value = value;
    }

    setFromObject(obj = {}) {
        Object.keys(obj).forEach(key => {
            let el = this.formElements.find(el => {
                return el.name === key
            });
            if (el) {
                el.value = obj[key];
            }
        });
    }

    changeDisabled(name = '', disabled = true) {
        this.formElements.find(el => el.name === name).disabled = disabled;
    }

    changeDisabledAll(disabled = true) {
        this.formElements.forEach(el => el.disabled = !disabled);
    }

    showError(name = '', message = 'Hay un error') {


        let el = this.formElements.find(el => el.name === name);

        if (!el) return;

        let alertInserted = el.parentNode.querySelector('.qme-alert-form');

        if (alertInserted) {
            alertInserted.parentNode.removeChild(alertInserted);
        }

        var alert = document.createElement('div');
        alert.setAttribute('class', 'qme-alert-form');
        alert.innerText = message;
        el.parentNode.appendChild(alert);
        el.focus();


    }

    removeError(name = '') {
        if (name === '') {
            this.formElements.forEach(el => {
                let alertInserted = el.parentNode.querySelector('.qme-alert-form');

                if (alertInserted) alertInserted.parentNode.removeChild(alertInserted);

            })
            return;
        }
        let el = this.formElements.find(el => el.name === name);
        if (!el) return;

        let alertInserted = el.parentNode.querySelector('.qme-alert-form');

        if (alertInserted) alertInserted.parentNode.removeChild(alertInserted);

    }

}