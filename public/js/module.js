let btnClose = document.getElementById('btn-close');
let admPanel = document.getElementById('adm-panel');
let moduleContent = document.getElementById('content-panel');
let buttons = Array.from(document.querySelectorAll('.table-btn.btn-detail'));

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        showAdmPanel(admPanel);
        gsap.to(moduleContent, {
            duration: 0.2,
            width: '100%'
        });
    });
});


btnClose.addEventListener('click', () => {
    gsap.to(admPanel, {
        duration: 0.2,
        x: '100%',
        display: 'none'
    });
});

let showAdmPanel = (el) => {
    gsap.to(el, {
        duration: 0.2,
        x: '0%',
        display: 'block'
    });
};