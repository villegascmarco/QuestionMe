let quizUser = null

window.onload = async() => {
    quizUser = await getQuizUser('2')
    console.log(quizUser)
}

let fullTable = () => {
    
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