
let carousel = document.getElementById('carousel');
let template = document.getElementById('template-section');
let checkbox = document.getElementById('template-check');

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


    


new CardCarousel(carousel);
let wizard = new Wizard(document.getElementById('step-wizard'));

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        template.classList.remove('disable-template')
    } else {
        template.classList.add('disable-template')
    }
  });

carousel.addEventListener('progress', (evt) => {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let position = evt.detail.position;
    let direction = evt.detail.direction;

    
    if ( position == 2 && !localStorage.getItem('QUIZ') && direction === 'FORWARD' ) {
        let slctCategory = "";
        debugger
        const fount = (categories.find(el => el.name == category) || category);

        let idCategory = fount.id
        
        fount.constructor.name === "Object" ? null : addCategory(fount)

        

        newQuiz = {
        name: title,
        is_template: checkbox.checked,
        quality:0.0,
        quiz_origin:null,
        status:1,
        category: idCategory,
        user:2
    }

    // add(newQuiz)
        
    } else if ( position == 1 && direction === 'REVERSE'  ) {
        
        console.log("Consultar")
    
    } else if ( position == 2 && localStorage.getItem('QUIZ') && direction === 'FORWARD') {
        editQuiz();
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


editQuiz = () => {
    editedQuiz = {
        "name":"Modificado",
        "is_template":true,
        "quality":0.0,
        "status":1,
        "category":1,
        "user":2
    }
    edit(editedQuiz)
}



//:::::::::::::::::::::::::::::::::::::::
//:::::::::: PETITION :::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::


let get = async (  ) => {
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
    });
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
    });

    return response
}