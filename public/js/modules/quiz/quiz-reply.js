let quiz_container = document.getElementById('quiz-container')
let title = document.getElementById('title')
let category = document.getElementById('category')

let quiz = {
    name: "Lenguajes de programación",
    category: "Programación",
    questions: [
        {
            id: 1,
            question: "Mejor lenguaje de programación",
            question_type: 1,
            possible_answers: [
                {
                    answer: "python"
                },
                {
                    answer: "java"
                }
            ]
        }
    ]
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
        questionTitle.innerText = question.question

        questionCont.append(questionTitle)
    
        genAnswersContainer(questionCont, question)

    })

}

let genAnswersContainer = (parent, question) => {
    let answerContainer = document.createElement("div")
    answerContainer.className = "answers-container"

    parent.append(answerContainer)

    question.possible_answers.map((answer) => {

        if (questionType = 1){

        
        let answerDiv = document.createElement("div")
            answerDiv.className = "answer"

            answerContainer.append(answerDiv)

        let input = document.createElement("input")
            input.type = 'radio'
            input.name = "answer" + question.id

            answerDiv.append(input)

        let label = document.createElement("label")
            label.innerText = answer.answer

            answerDiv.append(label)

        } else if (questionType = 2) { 

        let answerDiv = document.createElement("div")
        answerDiv.className = "answer qme-input special-login margin-top-25"

        answerContainer.append(answerDiv)


        let label = document.createElement("label")
            label.className = "label"
            label.innerText = "Respuesta"

        let input = document.createElement("input")
            input.className = "input answer-input"
            input.type = 'text'
            input.name = "answer" + question.id


        }

    })
        


}