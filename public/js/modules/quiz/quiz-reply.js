let quiz_container = document.getElementById('quiz-container')
let title = document.getElementById('title')
let category = document.getElementById('category')
let quiz = null

window.onload = () =>{
    quiz = JSON.parse(QUIZ_TO_REPLY)
    genQuestionContainer()
}


let genQuestionContainer = () => {
    title.innerText = quiz.name
    category.innerText = quiz.category

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
        name:"maria",
        last_name:"pérez",
        email:"villegascmarco@gmail.com",
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

    await setAnswers(answerUser)
}

//:::::::::::::::::::::::::::::::::::::::
//:::::::::: PETITION :::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::

let setAnswers = async(userAns) => {
    debugger
    let response = await fetch(`${ASSETS_ROUTE}nonHuman`, {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(userAns)
    });
    return response
}




