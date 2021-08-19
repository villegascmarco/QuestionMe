let tableContent = document.getElementById('quizzes-table')
let quizUser = null
let questionsQuizes = null
let categories = null
let usuario = null

window.onload = async() => {
    usuario = await getSelfData()
    await getDataTable()
}

let getDataTable = async() => {
    let promises = []

    categories = await getListCategory()
    
    quizUser = await getQuizUser(usuario.id)

    quizUser.map((quiz)=>{
        promises.push( getQuestionAnsID(quiz.id) ) 
        
    })

    questionsQuizes = await Promise.all(promises)
    
    await fullTable(quizUser)
}



let fullTable = (quizfill) => {
    let inners = ""
    let questionCount = 0

    
    quizfill.map((quiz, index) => {
        let fount = (categories.find(el => el.id == quiz.category));
        questionsQuizes[index] ? (questionCount = questionsQuizes[index].length) : (null)
        let status

        quiz.status == 1 ? (status = "Activa") : (status = "Inactiva")


        inners += "<tr>"
        inners += "<td>"+quiz.name+"</td>"
        inners += "<td>"+questionCount+"</td>"
        inners += "<td> <div class='bubble-categories-container'><label class='bubble no-button'>"+fount.name+"</label></div></td>"
        inners += `<td> <button class='table-btn btn-detail' onclick="editQuiz(${quiz.id})"> <img src='${ASSETS_ROUTE}img/svg/icons/view.svg'> </button></td>`
        inners += `<td> <button class='table-btn btn-detail' onclick="shareQuiz(${quiz.id})"> <img src='${ASSETS_ROUTE}img/svg/icons/share.svg'> </button></td>`
        inners += `<td> <button class='table-btn btn-detail' onclick="delQuiz(${quiz.id})"> <img src='${ASSETS_ROUTE}img/svg/icons/trash.svg'> </button></td>`
        inners += "</tr>"
        return inners
    })

    tableContent.innerHTML = inners
}

let searchQuiz = (el) => {
    let backupQuizes = quizUser
    let searchText = el.value.toLowerCase();
    let filterQuiz 
    if(searchText.trim() !== ''){
        filterQuiz = quizUser.filter(
        (quiz) =>
          quiz.name.toLowerCase().includes(searchText)
      );
    } else {
        filterQuiz = backupQuizes
    }

    fullTable(filterQuiz)
}

let editQuiz  = async (idQuiz) => {
    await getById(idQuiz)
    window.location = `${ASSETS_ROUTE}new-quiz`;
} 

let delQuiz  = async (idQuiz) => {
    let promises = []

    await delQuizRqst(idQuiz)
    
} 

let shareQuiz = async (idQuiz) => {
    let encrypt = await encryptID(idQuiz)
    let url = `${ASSETS_ROUTE}nonHuman/${encrypt}`
    let result = await Swal.fire({
            title: 'Comparte este enlace para responder el quiz',
            html: `<div class="qme-input special-login margin-top-25">            
        <label class="label">Enlace</label>      
        <input class="input" name="copy" value="${url}" id="swalCopyLink" type="text" autocomplete="off" form-message="Por favor, ingresa la contraseña actual">
        <div class="btn-container reply-btn-container" id="btn-container">
            <button id="qu-save" onclick="copyLink()" class="qme-button red finish-reply">Copiar enlace</button>
        </div>
        </div>`,
    confirmButtonText: '¡Confirmar!',
    confirmButtonColor: 'rgba(255,0,0,0.6)',
    focusConfirm: false,
    })

    if(!result.isConfirmed)
        return

}

let copyLink = () =>{
    let btnCopy = document.getElementById('qu-save')
    let copy = document.getElementById('swalCopyLink')
    copy.select();
    document.execCommand("copy");
    btnCopy.innerText = "¡Copiado!"
    btnCopy.style.backgroundColor = "#7cb364"
}



//:::::::::::::::::::::::::::::::::::::::
//:::::::::: PETITION :::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::


let getQuizUser = async(userID) => {
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${userID}`, {
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

let getListCategory = async() => {
    let response = await fetch(`${ASSETS_ROUTE}categories/`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
    return response
};

let getById = async(quizID) => {
    let response = await fetch(`${ASSETS_ROUTE}quizzes/q${quizID}`, {
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

    localStorage.setItem('QUIZ', JSON.stringify(response[0]))
    return response
};

let delQuizRqst = async(idQuiz) => {
    let response = await fetch(`${ASSETS_ROUTE}quizzes/${idQuiz}`, {
            method: "DELETE",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
        })
        .then(async(response) => {
            if (response.ok) {
                await getDataTable()
                return response.json()
            }
        })
    return response
};

let encryptID = async (idQuiz) => {
    let response = await fetch(`${ASSETS_ROUTE}quizzesE/${idQuiz}`, {
            method: "GET",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
        })
        .then((response) => {
            if (response.ok) {
                return response.text()
            }
        })
    return response
};

let getSelfData = () => {
    return fetch(`${ASSETS_ROUTE}getSelfData`)
        .then(resp => resp.json())
};