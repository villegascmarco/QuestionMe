let quiz_container = document.getElementById('quiz-container')
let quiz_all_div = document.getElementById('quiz-all')
let title = document.getElementById('title')
let category = document.getElementById('category')
let quiz = null
let ANSWER_CHECK = 6

window.onload = () =>{
    quiz = JSON.parse(QUIZ_TO_REPLY)
    genQuestionContainer()
    if(localStorage.getItem('USER_ANSWERS')){
        haveLocalStorage();
    }

}


let genQuestionContainer = () => {
    title.innerText = quiz.name
    category.innerText = quiz.category

    let answerName = document.createElement("div")
        answerName.className = "qme-input special-login margin-top-25"
    
    let answerLast = document.createElement("div")
        answerLast.className = "qme-input special-login margin-top-25"

    let answerEmail = document.createElement("div")
        answerEmail.className = "qme-input special-login margin-top-25"

        quiz_container.append(answerName)
        quiz_container.append(answerLast)
        quiz_container.append(answerEmail)

        /* ************************************************ */

        let label = document.createElement("label")
            label.className = "label"
            label.innerText = "Nombre"

            answerName.append(label)

        let input = document.createElement("input")
            input.className = "input answer-input"
            input.type = 'text'
            input.id = "name"

            answerName.append(input)

            /* ************************************************ */


        let labelLast = document.createElement("label")
            labelLast.className = "label"
            labelLast.innerText = "Apellidos"

            answerLast.append(labelLast)

        let inputLast = document.createElement("input")
            inputLast.className = "input answer-input"
            inputLast.type = 'text'
            inputLast.id = "lastname"

            answerLast.append(inputLast)

            /* ************************************************ */

        let labelEmail = document.createElement("label")
            labelEmail.className = "label"
            labelEmail.innerText = "Coreo electronico"

            answerEmail.append(labelEmail)

        let inputEmail = document.createElement("input")
            inputEmail.className = "input answer-input"
            inputEmail.type = 'text'
            inputEmail.id = "email"

            answerEmail.append(inputEmail)
            
            /* ************************************************ */

            
        if (!localStorage.getItem('USER_ANSWERS')){
        let btnContainer = document.createElement('div')
            btnContainer.className = "btn-container reply-btn-container"
            btnContainer.id = "btn-container"

            quiz_all_div.append(btnContainer)

        let btnSend = document.createElement('button')
            btnSend.className = "qme-button red finish-reply"
            btnSend.id = "qu-save"
            btnSend.innerText = "Enviar respuestas"
            btnSend.onclick = (evt) => {
                sendAnswers()
            }

            btnContainer.append(btnSend)
        }
        


            


    quiz.questions.map((question, index) => {
        let questionCont = document.createElement('div')
        questionCont.className = "question-container-reply"
    
        quiz_container.append(questionCont)
        
        let questionTitle = document.createElement('label')
        questionTitle.className = "question-reply"
        questionTitle.innerText = index+1 +". "+question.question

        questionCont.append(questionTitle)
    
        genAnswersContainer(questionCont, question)

    })

}

let genAnswersContainer = (parent, question) => {
    let answerContainer = document.createElement("div")
    answerContainer.className = "answers-container"
    
    parent.append(answerContainer)

    if(question.possible_answers.length !=0){

    question.possible_answers.map((answer) => {
        
        let answerDiv = document.createElement("div")
            answerDiv.className = "answer"

            answerContainer.append(answerDiv)

        let input = document.createElement("input")
            input.type = 'radio'
            input.value = answer.id
            input.name = "answer" + question.id

            answerDiv.append(input)

        let label = document.createElement("label")
            label.innerText = answer.answer

            answerDiv.append(label)

        } 

    )
    } else {
       
        let answerDiv = document.createElement("div")
        answerDiv.className = "answer qme-input special-login margin-top-25"

        answerContainer.append(answerDiv)


        let label = document.createElement("label")
            label.className = "label"
            label.innerText = "Respuesta"

            answerDiv.append(label)

        let input = document.createElement("input")
            input.className = "input answer-input"
            input.type = 'text'
            input.name = "answer" + question.id

            answerDiv.append(input)
    
            }
}

let sendAnswers = async() => {
    let questionsGen = document.getElementsByClassName('answers-container')
    let getName = document.getElementById('name').value
    let getLast = document.getElementById('lastname').value
    let getEmail = document.getElementById('email').value

    
    let answers = []
    quiz.questions.map((question, index) => {
        answers.push(questionsGen[index].querySelectorAll('.answer'))
    })

    let quizQA = []
    quiz.questions.map((question, index) => {
        let quizObj = {
            id: question.id,
            ansElem: answers[index]
        }
        quizQA.push(quizObj)
    })


    let answerUser = {
        name: getName,
        last_name:getLast,
        email:getEmail,
        open_ended:[
            
        ],
        closed_ended:[
            
        ]
    }

    
    let selectedClose = null
    let answersClose = null
    quizQA.map((questionF, index) => {
        questionF.ansElem.forEach((answer)=>{
                if(answer.querySelector('input[type=radio]') && answer.querySelector('input[type=radio]').checked){
                            selectedClose = answer.querySelector('input[type=radio]').value
                    } else if(answer.querySelector('input[type=text]')) {
                            answersClose = answer.querySelector('input[type=text]').value
                    }
            })
            if(!answersClose){
                let openQ = selectedClose
                answerUser['closed_ended'].push(openQ)
            } else {

                let openQ = {
                    question: questionF.id,
                    answer: answersClose
                }
                
                answerUser['open_ended'].push(openQ)

            }
            answersClose = null
            answersClose = null

    })


    console.log(answerUser)

    let result = {};

    result = await Swal.fire({
        title: "¿Estas seguro de enviar tus respuestas?",
        confirmButtonText: "¡Confirmar!",
        cancelButtonText: "Cancelar",
        confirmButtonColor: 'rgba(255,0,0,0.6)',
        showCancelButton: true,
        focusConfirm: false,        
    });

    if (!result.isConfirmed) return;

    await setAnswers(answerUser)

    
}

let haveLocalStorage = () => {
    let userAnswers = JSON.parse(localStorage.getItem('USER_ANSWERS'))
    let answer_container = document.querySelectorAll('.answer')
    let user = userAnswers.user[ANSWER_CHECK]
    let userCount = document.getElementById('users')

    document.getElementById('btn-user').style.display = "block"

    userCount.innerText = `Usuarios: \n ${ANSWER_CHECK+1} / ${userAnswers.user.length}`
    

    let name = document.getElementById('name')
    let last = document.getElementById('lastname')
    let email = document.getElementById('email')

    name.value = user.name
    last.value = user.last_name
    email.value = user.email

    let answer = []
    user.questions.map((question) => {
        answer.push(question.answer_selected)
    })

    
    answer_container.forEach((el) => {
        if(el.querySelector('input[type=radio]')) {
            answer.map((ans) => {
                if(el.querySelector('input[type=radio]').value == ans.id){
                    el.querySelector('input[type=radio]').checked = true
                } 
            })
        } else if (el.querySelector('input[type=text]')) {
            answer.map((ans) => {
               let inpName =  el.querySelector('input[type=text]').name
               questionID = inpName.replace('answer','')

               if(questionID == ans.question) {
                    if(el.querySelector('input[type=text]').name == `answer${ans.question}`)
                        el.querySelector('input[type=text]').value = ans.given_answer

               }

               
            })
        }
        
        
    })

    
    


}

let nextUser = () => {
    let userAnswers = JSON.parse(localStorage.getItem('USER_ANSWERS'))
    if(ANSWER_CHECK < userAnswers.user.length-1 ){
        ANSWER_CHECK++
        haveLocalStorage()
    }
}

let prevUser = () => {
    if(ANSWER_CHECK >= 0 ){
        ANSWER_CHECK--
        haveLocalStorage()
    }
}

//:::::::::::::::::::::::::::::::::::::::
//:::::::::: PETITION :::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::

let setAnswers = async(userAns) => {
    let response = await fetch(`${ASSETS_ROUTE}nonHuman`, {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(userAns)
    }).then((response) => {
        if (response.ok) {
            window.location = `${ASSETS_ROUTE}`;
        }
    });
    return response
}




