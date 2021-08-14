let carousel = document.getElementById('carousel');
let template = document.getElementById('template-section');
let checkbox = document.getElementById('template-check');
let answerSection = document.getElementById('answer-section')
let saveBtn = document.getElementById('qu-save')
let editMode = false
let templateslct = null

let answersCheck = []


template.classList.add('disable-template')

let categories
window.onload = async() => {
    categories = await getListCategory()
    genCategoriesOption()
    haveLocalStorage()
    await genTemplates()
}

$('#category').autocomplete({
    source: function(request, response) {
        var data = categories;

        var datamap = data.map(function(i) {
            return {
                label: i.name,
                value: i.name,
            }
        });

        var key = request.term;

        datamap = datamap.filter(function(i) {
            return i.label.toLowerCase().indexOf(key.toLowerCase()) >= 0;
        });
        $(".ui-helper-hidden-accessible").hide();
        response(datamap);
    },
    minLength: 1,
    delay: 20
});

saveBtn.addEventListener('click', async() => {
    await saveAnswer()
})

function getPosibleAnswers(el) {
    if (el.value == 2) {

        if (document.getElementById('answer-checkboxes')) {
            document.getElementById('answer-checkboxes').remove()
        }

        let answerSection = document.getElementById('answer-section')
        answerSection.style.display = "none"


    } else if (el.value == 1) {
        genMultiple()
    }
}

const genMultiple = () => {
    if (document.getElementById('posible-answer')) {
        document.getElementById('posible-answer').remove()
    }


    let answerSection = document.getElementById('answer-section')
    answerSection.style.display = "grid"

    let divAllMulti = document.createElement("div")
    divAllMulti.className = "answer-checkboxes"
    divAllMulti.id = "answer-checkboxes"

    let divCheck = document.createElement("div")
    divCheck.id = "answers-pending"
    divCheck.className = "answers-pending"

    let divBtn = document.createElement("div")
    divBtn.className = "answer-btn"
    divBtn.id = "answer-btn"


    let button
    let removeBtn
    if (!editMode) {
        let radio = document.createElement("input")
        radio.type = "radio"
        radio.name = "posible-answer-radio"


        let input = document.createElement("input")
        input.className = "input special-answer"
        input.name = "posible-answer"

        button = document.createElement("button")
        button.className = "qme-button add-del red"


        let img = document.createElement('img');
        img.className = "icon-answer"
        img.setAttribute('src', `${ASSETS_ROUTE}img/svg/icons/plus-white.svg`);
        button.appendChild(img);

        removeBtn = document.createElement("button")
        removeBtn.className = "qme-button add-del red"

        let imgMinus = document.createElement('img');
        imgMinus.className = "icon-answer"
        imgMinus.setAttribute('src', `${ASSETS_ROUTE}img/svg/icons/minus.svg`);
        removeBtn.appendChild(imgMinus);

        divCheck.append(radio)
        divCheck.append(input)
        divBtn.append(button)
        divBtn.append(removeBtn)


    }




    answerSection.append(divAllMulti)
    divAllMulti.append(divCheck)
    divAllMulti.append(divBtn)

    if (!editMode) {
        button.addEventListener('click', () => {
            let answersCheck = document.getElementsByName('posible-answer-radio').length
            if (answersCheck !== 4) {
                addAnswer(divCheck)
            }
        })

        removeBtn.addEventListener('click', () => {
            let answersCheck = document.getElementsByName('posible-answer-radio').length
            if (answersCheck > 1) {
                delAnwer(divCheck)
            }
        })
    }



}

const delAnwer = (parent) => {
    let answers = document.getElementsByName('posible-answer-radio')
    let questions = document.getElementsByName('posible-answer')
    answers[answers.length - 1].remove()
    questions[questions.length - 1].remove()
}

const addAnswer = (parent) => {
    let radio = document.createElement("input")
    radio.type = "radio"
    radio.name = "posible-answer-radio"


    let input = document.createElement("input")
    input.className = "input special-answer"
    input.name = "posible-answer"


    parent.append(radio)
    parent.append(input)
}

const addAnswerDynamic = (parent, answer, correct) => {
    let radio = document.createElement("input")
    radio.type = "radio"
    radio.name = "posible-answer-radio"

    correct ? (radio.checked = true) : (null)


    let input = document.createElement("input")
    input.className = "input special-answer"
    input.name = "posible-answer"
    input.value = answer


    parent.append(radio)
    parent.append(input)
}

let btnContainer = document.getElementById('btn-container');
let answers = document.createElement("div")
answers.className = "answers-waiting"
btnContainer.append(answers)

const saveAnswer = async() => {
    let openAnswer = document.getElementById('rd-open')
    let questionstr = document.getElementById('question')
    let inputContainer = document.getElementById('qme-input')

    if (document.getElementsByClassName('answer-checkboxes')) {
        let checkAnswers = document.getElementsByName('posible-answer-radio')
        let inputAnswer = document.getElementsByName('posible-answer')
        let questionTypeOpen = document.getElementById('rd-open')
        let questionTypeMulti = document.getElementById('rd-multiple')
        let answersPending = document.getElementById('answer-checkboxes')
        let alertShow = document.getElementById('qme-alert-form')

        let answerSlct = 0
        let arrAnswers = []

        if(alertShow)
            alertShow.remove()

        let questionObj
        if (editMode) {
            questionObj = JSON.parse(localStorage.getItem('QUESTION'))
        }

        for (var x = 0; x < checkAnswers.length; x++) {
            checkAnswers[x].value = inputAnswer[x].value

            if (!checkAnswers[x].checked)
                answerSlct++

                if (!editMode) {
                    arrAnswers.push({
                        answer: inputAnswer[x].value,
                        is_correct: checkAnswers[x].checked
                    })
                } else {
                    arrAnswers.push({
                        idAnswer: questionObj.possible_answers[x].id,
                        answer: inputAnswer[x].value,
                        is_correct: checkAnswers[x].checked
                    })
                }


        }

        if(questionstr.value.trim() == '') {
            let alert = genAlert('Selecciona una respuesta correcta')
            answersPending.append(alert)
            return false
        }

        if (checkAnswers.length == answerSlct){
            let alert = genAlert('Selecciona una respuesta correcta')
            answersPending.append(alert)
            return false
        }   
            




        let question = {
            question: questionstr.value,
            question_type: openAnswer.checked ? 2 : 1
        }


        let quAnswer
        quAnswer = arrAnswers


        if (document.getElementById('answer-checkboxes')) {
            document.getElementById('answer-checkboxes').remove()

        } else if (document.getElementById('posible-answer')) {
            document.getElementById('posible-answer').remove()
        }

        questionstr.value = ""
        questionTypeOpen.checked = false
        questionTypeMulti.checked = false

        await setQuestionAnswer(question, quAnswer)

    } else {

        let question = {
            question: questionstr.value,
            question_type: openAnswer.checked ? 2 : 1
        }

        setQuestion(question)
    }
}

const setQuestionAnswer = async(question, quAnswer) => {

    let promises = []

    if (!editMode) {
        let idQuestion = await addQuestion(question)

        quAnswer.forEach((answer) => {
            promises.push(addAnswerRqst(answer, idQuestion))
        })
    } else if (editMode) {
        await edtQuestion(question)
        quAnswer.forEach((answer) => {
            promises.push(edtAnswers(answer))
        })
    }

    await Promise.all(promises).then(async(values) => {
        await setQuestionsText()
    })

}

const setQuestion = async(question) => {

    if (!editMode) {
        await addQuestion(question)

    } else if (editMode) {
        await edtQuestion(question)
    }


    await setQuestionsText()


}

let setQuestionsText = async() => {
    let questionsSave
    questionsSave = await getQuestionAns()

    let inners = ""
    let listQu = questionsSave.forEach((questionObj, index) => {
        inners += "<div class='questions-wait'> <strong> Pregunta: </strong>" + parseInt(index + 1) + ". " + questionObj.question + "<br>"
        inners += "<h5>Respuestas: </h5>"
        questionObj.possible_answers.forEach((answers) => {
            answers.is_correct ?
                (inners += "<mark>" + answers.answer + "</mark> <br>") :
                (inners += "<label>" + answers.answer + "</label> <br>")
        })
        inners += "<button class='qme-button red qu-btn' onclick='getQuestion(" + questionObj.id + ")'>Editar</button> <button class='qme-button red qu-btn' onclick='delQuestion(" + questionObj.id + ")'>Borrar</button></div>"
        return inners
    })

    answers.innerHTML = inners
}

let getQuestion = async(idQuestion) => {

    editMode = true

    let question = document.getElementById('question')
    let questionTypeOpen = document.getElementById('rd-open')
    let questionTypeMulti = document.getElementById('rd-multiple')
    let divBtn = document.getElementById('answer-btn')

    question.value = ""
    questionTypeOpen.checked = false
    questionTypeMulti.checked = false

    let quObj = await getQustionObj(idQuestion)

    if (quObj.question_type == 2) {
        questionTypeOpen.checked = true
        question.value = quObj.question

    } else if (quObj.question_type == 1) {

        questionTypeMulti.checked = true

        let divAll = document.getElementById('answer-checkboxes')


        if (divAll)
            divAll.remove()


        genMultiple()

        let divCheck = document.getElementById('answers-pending')

        question.value = quObj.question

        quObj.possible_answers.forEach((answer) => {
            addAnswerDynamic(divCheck, answer.answer, answer.is_correct)
        })

    }


    saveBtn.innerText = "Editar"
}

let carouselController = new CardCarousel(carousel);
let wizard = new Wizard(document.getElementById('step-wizard'));

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        template.classList.remove('disable-template')
    } else {
        template.classList.add('disable-template')
        $('.selected-template').removeClass('selected-template')
        templateslct = null
    }
});

// debugger
carouselController.callbackNext = (position) => {


    if (position == 1) {
        let title = document.getElementById('title').value;
        let category = document.getElementById('category').value;
        let titleContainer = document.getElementById('save-title')
        let categoryContainer = document.getElementById('save-category')
       
        
        if (title.trim() === '') {
            let alert = genAlert('Ingresa un titulo')
            titleContainer.append(alert)
            if (category.trim() == '') {
                let alert = genAlert('Ingresa una categoria')
                categoryContainer.append(alert)
                return false;
            }
            return false;

        }

        if (category.trim() == '') {
            
            let alert = genAlert('Ingresa una categoria')
            categoryContainer.append(alert)
            return false;
        }
        return true

    } else if (position == 4) {
        let radioPublic = document.getElementById('is-public-step')
       
        let publicCheck = document.getElementsByName('is-public')
        let answerSlct = 0

        for (var x = 0; x < publicCheck.length; x++) {

            if (!publicCheck[x].checked)
                answerSlct++

        }
        debugger
        if (publicCheck.length == answerSlct) {
            let alert = genAlert('Selecciona uno porfavor')
            radioPublic.append(alert)
            return false
        }
    }
    return true

}



carousel.addEventListener('progress', async(evt) => {

    let title = document.getElementById('title');
    let category = document.getElementById('category').value;
    let position = evt.detail.position;
    let direction = evt.detail.direction;

    if (position == 2 && !localStorage.getItem('QUIZ') && direction === 'FORWARD') {
        let idCategory
        const fount = (categories.find(el => el.name == category) || category);
        idCategory = fount.id

        fount.constructor.name === "Object" ? null : idCategory = await addCategory(fount)

        if(!templateslct)  
            templateslct = {
                id: null 
            }

        newQuiz = {
            name: title.value,
            is_template: 0,
            quality: 0.0,
            quiz_origin: templateslct.id,
            status: 1,
            category: idCategory,
            user: 2
        }
        await add(newQuiz)

        if (templateslct || localStorage.getItem('QUIZ')) {
            await setQuestionsText()
        }

    } else if (position == 2 && localStorage.getItem('QUIZ') && direction === 'FORWARD') {
        let idCategory
        const fount = (categories.find(el => el.name == category) || category);
        idCategory = fount.id
        fount.constructor.name === "Object" ? null : idCategory = await addCategory(fount)
        editedQuiz = {
            name: title.value,
            is_template: 0,
            quality: 0.0,
            quiz_origin: 0,
            status: 1,
            category: idCategory,
            user: 2
        }

        await edit(editedQuiz)

        if (templateslct || localStorage.getItem('QUIZ')) {
            await setQuestionsText()
        }


    } else if (position == 3) {
        lastStep()

    } else if (position == 4 && localStorage.getItem('QUIZ')) {

        editedQuiz = {
            is_template: 1
        }

        await edit(editedQuiz)

        window.location = `${ASSETS_ROUTE}`;

    } 




    if (direction === 'FORWARD' && position < 4) {
        wizard.nextStep();
    } else {
        wizard.previousStep();

    }

})

let genTemplates = async(categoryID) => {



    let templatesCont = document.getElementsByClassName('layout-container')
    let templatesCount = templatesCont.length
    if (templatesCont) {
        for (var i = 0; i < templatesCount; i++) {
            templatesCont[0].remove()
        }
    }

    let public_quizes = await getAllPublic()

    let templates_section = document.getElementById('template-section')

    let typeCategory = typeof categoryID

    if (typeCategory == "number") {
        public_quizes = public_quizes.filter((quiz) => quiz.category == categoryID);
    }


    public_quizes.map(() => {
        let templateContainer = document.createElement("div")
        templateContainer.className = 'layout-container'
        templates_section.append(templateContainer)
    })

    let templatesContainer = document.getElementsByClassName('layout-container')

    let quizesAll = []
    let promises = []
    let objQuiz = JSON.parse(localStorage.getItem('QUIZ'))

    public_quizes.map(async(quiz, index) => {

        if (objQuiz) {
            objQuiz.quiz_origin == quiz.id ? templatesContainer[index].classList.add('selected-template') : null
        }

        let titleContainer = document.createElement("div")
        titleContainer.className = "titleContainer"

        let title = document.createElement("label")
        title.className = "template-title"
        title.innerText = quiz.name


        let getQuestion = getQuestionAnsID(quiz.id)
        promises.push(getQuestion)


        titleContainer.append(title)

        templatesContainer[index].append(titleContainer)
        templatesContainer[index].onclick = (evt) => {
            onTemplateChange(quiz, evt.target)
        }
    })


    let results = await Promise.all(promises)
    let quizDiv

    let titleContainerAll = document.getElementsByClassName('titleContainer')


    results.map((questions, index) => {

        quizDiv = document.createElement("div")
        quizDiv.className = "questions-quiz"




        titleContainerAll[index].append(quizDiv)

        questions.map((question, index) => {
            let questionPut = document.createElement("label")
            questionPut.className = "question-template"
            questionPut.innerText = index + 1 + ". " + question.question
            quizDiv.append(questionPut)
        })



    })

}

let genCategoriesOption = () => {

    let listCategories = document.getElementById('list-categories-bubbles')


    let categoryAll = document.createElement('div')
    categoryAll.className = "bubble-space"


    let labelAll = document.createElement('label')
    labelAll.className = 'bubble'
    labelAll.innerText = "Todas"
    labelAll.htmlFor = "all"

    categoryAll.append(labelAll)

    let radioAll = document.createElement('input')
    radioAll.type = 'radio'
    radioAll.name = "category-select"
    radioAll.id = "all"
    radioAll.value = "all"
    radioAll.className = "category-sel"
    radioAll.onchange = () => {
        onCategoryChange('all')
    }

    labelAll.append(radioAll)


    listCategories.append(categoryAll)

    categories.map((category) => {

        let categoryDiv = document.createElement("div")
        categoryDiv.className = "bubble-space"


        let label = document.createElement('label')
        label.className = 'bubble no-button'
        label.innerText = category.name
        label.htmlFor = category.name

        categoryDiv.append(label)

        let radio = document.createElement("input")
        radio.type = "radio"
        radio.className = "category-sel"
        radio.name = "category-select"
        radio.id = category.name
        radio.value = category.id
        radio.onchange = () => {
            onCategoryChange(category.id)
        }

        label.append(radio)

        listCategories.append(categoryDiv)

    })
}

let onCategoryChange = (category) => {
    let categoriesOpt = document.getElementsByClassName('category-sel')
    let selected
    for (var i = 0; i < categoriesOpt.length; i++) {
        if (categoriesOpt[i].checked) {
            selected = categoriesOpt[i]
        }
    }

    $(selected).parent().parent().parent().find('.bubble-space').find('.bubble').not('.no-button').addClass('no-button')
    $(selected).parent().removeClass('no-button')


    genTemplates(category)
}

let onTemplateChange = (template, el) => {
    if (checkbox.checked) {
        if ($('.selected-template')) {
            $('.selected-template').removeClass('selected-template')
        }

        el.classList.add('selected-template')
        templateslct = template
    } else {

    }
}

let haveLocalStorage = () => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))

    let title = document.getElementById('title')
    let category = document.getElementById('category')
    let switchTemplate = document.getElementById('switch-template')

    if (obj) {
        const fount = (categories.find(el => el.id == obj.category));
        title.value = obj.name
        category.value = fount.name
        switchTemplate.remove()
    }
}

let lastStep = async() => {

    categories = await getListCategory()

    let obj = JSON.parse(localStorage.getItem('QUIZ'))

    const fount = (categories.find(el => el.id == obj.category));

    let lastStep = document.getElementById("lastStep")

    let questionsSave = await getQuestionAns()

    let inners = ""
    inners += "<div class='quiz-last'> <h2> Titulo: " + obj.name + "</h2> "
    inners += "<h3> Categoria: " + fount.name + "</h3> </div>"
    let listQu = questionsSave.forEach((questionObj, index) => {
        inners += "<div class='questions-final'> <strong> Pregunta: </strong>" + parseInt(index + 1) + ". " + questionObj.question + "<br>"
        inners += "<h5>Respuestas: </h5>"
        questionObj.possible_answers.forEach((answers) => {
            answers.is_correct ?
                (inners += "<mark>" + answers.answer + "</mark> <br>") :
                (inners += "<label>" + answers.answer + "</label> <br>")
        })
        inners += "</div>"
        return inners
    })

    lastStep.innerHTML = inners

}

let genAlert = (message) => {
    let alert = document.createElement('div')
    alert.className = 'qme-alert-form'
    alert.id = 'qme-alert-form'
    alert.innerText = message

    return alert
}

//:::::::::::::::::::::::::::::::::::::::
//:::::::::: PETITION :::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::

let getAllPublic = async() => {
    let response = await fetch(`${ASSETS_ROUTE}quizzes`, {
        method: "GET",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
    });

    return response
}


let get = async() => {
    let response = await fetch(`${ASSETS_ROUTE}quizzes`, {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(edtQuiz)
    });
    return response
}

let getById = async() => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))
    let response = await fetch(`${ASSETS_ROUTE}quizzes/q${obj.id}`, {
        method: "GET",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
    });

    localStorage.setItem('QUIZ', JSON.stringify(response))
    return response
}

let add = async(newQuiz) => {
    let response = await fetch(`${ASSETS_ROUTE}quizzes`, {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(newQuiz)
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
    });

    localStorage.setItem('QUIZ', JSON.stringify(response))
    return response
}

let edit = async(edtQuiz) => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${obj.id}`, {
        method: "PUT",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(edtQuiz)
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
    });
    localStorage.setItem('QUIZ', JSON.stringify(response))
    return response
}


//:::::::::::::::::::::::::::::::::::::::
//:::::::::: CATEGORIES :::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::

let getListCategory = async() => {
    let response = await fetch(`${ASSETS_ROUTE}categories/`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
    return response
};


let addCategory = async(newCategory) => {
    let genCategory = {
        name: newCategory
    }
    let response = await fetch(`${ASSETS_ROUTE}categories`, {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify(genCategory)
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
    return response.category.id
}

//:::::::::::::::::::::::::::::::::::::::
//:::::::: QUESTION & ANSWERS :::::::::::
//:::::::::::::::::::::::::::::::::::::::

let getQuestionAns = async() => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${obj.id}/questions`, {
            method: "GET",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })

    return response
}

let getQuestionAnsID = async(idQuiz) => {
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${idQuiz}/questions`, {
            method: "GET",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })

    return response
}


let addQuestion = async(newQuestion) => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${obj.id}/questions`, {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify(newQuestion)
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })

    return response.id
}

let addAnswerRqst = async(newAnswer, idQuestion) => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${obj.id}/questions/${idQuestion}/answers`, {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify(newAnswer)
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })

    return response

}

let delQuestion = async(idQuestion) => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${obj.id}/questions/${idQuestion}`, {
            method: "DELETE",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
        })
        .then(async(response) => {
            if (response.ok) {
                saveBtn.innerText = "Añadir"
                editMode = false
                await setQuestionsText()
                return response.json()
            }
        })
    return response
}

let getQustionObj = async(idQuestion) => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${obj.id}/questions/${idQuestion}`, {
            method: "GET",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
        })
        .then(async(response) => {
            if (response.ok) {
                return response.json()
            }
        })
    localStorage.setItem('QUESTION', JSON.stringify(response))
    return response

}

let edtQuestion = async(question) => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))
    let quObj = JSON.parse(localStorage.getItem('QUESTION'))
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${obj.id}/questions/${quObj.id}`, {
        method: "PUT",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(question)
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
    });

    saveBtn.innerText = "Añadir"
    editMode = false
    return response
}

let edtAnswers = async(edtAnswer) => {
    let obj = JSON.parse(localStorage.getItem('QUIZ'))
    let quObj = JSON.parse(localStorage.getItem('QUESTION'))
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${obj.id}/questions/${quObj.id}/answers/${edtAnswer.idAnswer}`, {
        method: "PUT",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(edtAnswer)
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
    });


    return response
}