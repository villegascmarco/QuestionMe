const label = document.getElementById('countTemplate')
const table = document.getElementById('humanTable')
var userData = {}
let templateReport = {};
let humanReport = [];


window.addEventListener('load', async() => {
    userData = await getData();
    templateReport = await getTemplateReport();
    humanReport = await getHumanReport();
    fillHumanReport()
    animateValue(label, 0, templateReport.totalTemplatesUsed, 500);
})


const getHumanReport = () => {
    return fetch(`${ASSETS_ROUTE}humanReport/${userData.id}`).then(resp => resp.json())
}

const fillHumanReport = () => {


    let tbody = table.querySelector('tbody')
    tbody.innerHTML = ""
    let rowEmpty = document.createElement('tr');
    let emptyCell = document.createElement('td')
    rowEmpty.setAttribute('class', 'human-row')
    emptyCell.setAttribute('colspan', 3)
    emptyCell.innerText = 'Vaya, todo se ve muy vacío por aquí...'
    rowEmpty.appendChild(emptyCell)
    humanReport.length > 0 ?
        humanReport.forEach(human => {

            let row = document.createElement('tr')
            row.setAttribute('class', 'human-row')
            let nameCell = document.createElement('td')
            let mailCell = document.createElement('td')
            let quizCell = document.createElement('td')
            nameCell.innerText = `${human.name} ${human.last_name}`
            mailCell.innerText = `${human.email}`
            quizCell.innerText = `${human.QuizName}`
            row.appendChild(nameCell)
            row.appendChild(mailCell)
            row.appendChild(quizCell)
            tbody.appendChild(row)

        }) : tbody.appendChild(rowEmpty)

}

const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const getTemplateReport = () => {

    return fetch(`${ASSETS_ROUTE}templateReport/${userData.id}`).then(resp => resp.json())

}


let getData = () => {
    return fetch(`${ASSETS_ROUTE}getSelfData`)
        .then(resp => resp.json())
};