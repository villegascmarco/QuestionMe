let quiz_container = document.getElementById('quiz-container')


let genQuestionContainer = () => {
    let questionCont = document.createElement('div')
    questionCont.className = "question-container-reply"

    let questionTitle = document.createElement('label')
    questionTitle.className = "question-reply"
    //questionTitle.innerText = question.question

    genAnswersContainer(questionCont)
}

let genAnswersContainer = (parent) => {
    let answerContainer = document.createElement("div")
    answerContainer.className = "answers-container"

    //mapAnswers
        // if (questionType = 1)
        let answer = document.createElement("div")
        answer.className = "answer"

        let input = document.createElement("input")
        input.type = 'radio'
        //input.name = "answer"

        let label = document.createElement("label")
        // label.innerText = answer.answer

        //else if questionType = 2

        let answer = document.createElement("div")
        answer.className = "answer qme-input special-login margin-top-25"

        let input = document.createElement("input")
        input.className = "input answer-input"
        input.type = 'text'
        //input.name = "answer"

        let label = document.createElement("label")
        // label.innerText = answer.answer


}