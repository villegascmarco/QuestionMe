let carousel = document.getElementById('carousel');
let template = document.getElementById('template-section');
let checkbox = document.getElementById('template-check');
let answerSection = document.getElementById('answer-section')

let answersCheck = []

template.classList.add('disable-template')

let categories
window.onload = async() => {
   categories = await getListCategory()    
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

function getPosibleAnswers(el) {
    if (el.value == 2) {

        if( document.getElementById('answer-checkboxes') ) {
            document.getElementById('answer-checkboxes').remove()
        }

        let input = document.createElement("input")
        input.className = "input"
        input.id = "posible-answer"
        answerSection.append(input);

    } else if (el.value == 1) {
        genMultiple()
    }
}




const genMultiple = () => {
    if( document.getElementById('posible-answer') ) {
        document.getElementById('posible-answer').remove()
    }

    let divAllMulti = document.createElement("div")
    divAllMulti.className = "answer-checkboxes"
    divAllMulti.id = "answer-checkboxes"
    
    let divCheck = document.createElement("div")
    divCheck.className = "answer-checkboxes"

    let divBtn = document.createElement("div")
    divBtn.className = "answer-btn"

    let radio = document.createElement("input")
    radio.type = "radio"
    radio.name = "posible-answer-radio"
    

    let input = document.createElement("input")
    input.className = "input special-answer"
    input.name = "posible-answer"

    let button = document.createElement("button")
    button.className = "qme-button round red"

    let img = document.createElement('img');
    img.className = "icon-answer"
    img.setAttribute('src', `${ASSETS_ROUTE}img/svg/icons/plus-white.svg`);
    button.appendChild(img);

    answerSection.append(divAllMulti)
    divAllMulti.append(divCheck)
    divAllMulti.append(divBtn)
    
    divCheck.append(radio)
    divCheck.append(input)
    divBtn.append(button)

    button.addEventListener('click', () => {
        let answersCheck = document.getElementsByName('posible-answer-radio').length
        if (answersCheck !== 4) {
            addAnswer(divCheck)
        }
    })
}
const addAnswer = ( parent ) => {
    let radio = document.createElement("input")
    radio.type = "radio"
    radio.name = "posible-answer-radio"
    

    let input = document.createElement("input")
    input.className = "input special-answer"
    input.name = "posible-answer"
    

    parent.append(radio)
    parent.append(input)
}

let btnContainer = document.getElementById('btn-container');
        let answers = document.createElement("div")
        answers.className = "answers-waiting"
        btnContainer.append(answers)

const saveAnswer = async () => {
    let openAnswer = document.getElementById('rd-open')

    if (document.getElementsByClassName('answer-checkboxes')) {
        let checkAnswers = document.getElementsByName('posible-answer-radio')
        let inputAnswer = document.getElementsByName('posible-answer')
        let questionstr = document.getElementById('question')
        let questionTypeOpen = document.getElementById('rd-open')
        let questionTypeMulti = document.getElementById('rd-multiple')

        let answerSlct = 0
        let arrAnswers = []
        for(var x=0; x < checkAnswers.length; x++) {
            checkAnswers[x].value = inputAnswer[x].value

            if(!checkAnswers[x].checked)
                answerSlct++ 
             
            arrAnswers.push({
                answer: inputAnswer[x].value,
                is_correct: checkAnswers[x].checked
            })
        }

        if(checkAnswers.length == answerSlct)
            console.log("No se selecciono ni uno")

        


        let question = {
            question: questionstr.value,
            question_type: openAnswer.checked ? 2 : 1
        }

        
        let quAnswer
        openAnswer.checked ? 
        (quAnswer.data.push({

        }))
        :
        (quAnswer = arrAnswers)

       
      if( document.getElementById('answer-checkboxes') ) {
            document.getElementById('answer-checkboxes').remove()

        } else if (document.getElementById('posible-answer')) {
            document.getElementById('posible-answer').remove()
        }

        questionstr.value=""
        questionTypeOpen.checked = false 
        questionTypeMulti.checked = false

        await setQuestionAnswer( answers, question, quAnswer)

    }   
}

const setQuestionAnswer = async ( parent, question, quAnswer ) => {

    
    let idQuestion = await addQuestion( question )
    let questionsSave
    let promises = []
    
    quAnswer.forEach( (answer) => {
        promises.push(addAnswerRqst( answer, idQuestion ))
    })

    await Promise.all(promises).then(async(values) => {
        questionsSave = await getQuestionAns()
    })
    
    let inners = ""
    let listQu = questionsSave.forEach( (questionObj, index) => {
        inners += "<div class='questions-wait'> <strong> Pregunta: </strong>" +parseInt(index+1)+". " + questionObj.question +"<br>"
        inners += "<h5>Respuestas: </h5>"
        questionObj.possible_answers.forEach((answers, index) => {
            answers.is_correct ? 
            (inners += "<mark>" + answers.answer +"</mark> <br>") 
            : 
            (inners += "<label>" + answers.answer +"</label> <br>")
        })
        inners += "<button class='qme-button red qu-btn' onclick='editQuestion("+index+")'>Editar</button> <button class='qme-button red qu-btn' onclick='delQuestion("+index+")'>Borrar</button></div>"
        return inners
    })

    parent.innerHTML = inners

}



new CardCarousel(carousel);
let wizard = new Wizard(document.getElementById('step-wizard'));

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        template.classList.remove('disable-template')
    } else {
        template.classList.add('disable-template')
    }
  });

carousel.addEventListener('progress', async(evt) => {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let position = evt.detail.position;
    let direction = evt.detail.direction;
    
    if ( position == 2 && !localStorage.getItem('QUIZ') && direction === 'FORWARD' ) {
        let idCategory
        const fount = (categories.find(el => el.name == category) || category);
        idCategory = fount.id
        
        fount.constructor.name === "Object" ? null : idCategory = await addCategory(fount)
        
        newQuiz = {
            name: title,
            is_template: checkbox.checked,
            quality:0.0,
            quiz_origin:null,
            status:1,
            category: idCategory,
            user:2
    }
        add(newQuiz)

    } else if ( position == 2 && localStorage.getItem('QUIZ') && direction === 'FORWARD') {
        let idCategory
        const fount = (categories.find(el => el.name == category) || category);
        idCategory = fount.id
        fount.constructor.name === "Object" ? null : idCategory = await addCategory(fount)

        editedQuiz = {
            name: title,
            is_template: checkbox.checked,
            quality:0.0,
            status:1,
            category:idCategory,
            user:2
        }

        edit( editedQuiz )
    } 

    else if ( position == 3) {
        localStorage.clear()
    } 
    

    if (direction === 'FORWARD') {
        wizard.nextStep();
        
    } else {
        wizard.previousStep();
        
    }

})

//:::::::::::::::::::::::::::::::::::::::
//:::::::::: BUILD ::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::








//:::::::::::::::::::::::::::::::::::::::
//:::::::::: PETITION :::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::


let get = async () => {
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

let getById = async () => {
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

let add = async ( newQuiz ) => {
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

let edit = async ( edtQuiz ) => {
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

let getListCategory = async () => {
    let response = await fetch(`${ASSETS_ROUTE}categories/`)
    .then((response) => {
        if(response.ok){
            return response.json()
        }
    })
    return response
};


let addCategory = async (newCategory) => {
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

let getQuestionAns = async () => {
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

let addQuestion = async ( newQuestion ) => {
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

let addAnswerRqst = async ( newAnswer, idQuestion) => {
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

let delQuestion = async () => {

}