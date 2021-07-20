let tableController = new Table(document.getElementById('main-table'));
tableController.clear();
// tableControler.showLoader(7);

let arr = [{
    fotografia: 'no image',
    nombre: 'bob',
    registrado: 'facebook',
    rol: 'usuario',
    estado: 'activo'
}]

for (let i = 0; i < 15; i++) {
    arr.push({
        fotografia: 'no image',
        nombre: 'bob ' + i,
        registrado: 'facebook',
        rol: 'usuario',
        estado: 'activo'
    });
}
// debugger
tableController.showData({
    data: arr,
    columns: [{
            funct: (value) => {
                let img = document.createElement('img');
                img.setAttribute('src', value['fotografia']);
                return img;
            },
        },
        { column: 'nombre' },
        { column: 'registrado' },
        { column: 'rol' },
        { column: 'estado' },
        {
            funct: (value) => {
                let button = document.createElement('button');
                button.setAttribute('class', 'table-btn btn-detail');
                let img = document.createElement('img');
                img.setAttribute('src', `${ASSETS_ROUTE}img/svg/icons/view.svg`);
                button.appendChild(img);
                button.addEventListener('click', () => {
                    console.log(value);
                })

                return button;
            }
        },
        {
            funct: (value) => {
                let button = document.createElement('button');
                button.setAttribute('class', 'table-btn btn-detail');
                let img = document.createElement('img');
                img.setAttribute('src', `${ASSETS_ROUTE}img/svg/icons/trash.svg`);
                console.log(`${ASSETS_ROUTE}`)
                button.appendChild(img);
                button.addEventListener('click', () => {
                    console.log(value);
                })

                return button;
            }
        }
    ]
});

tableController.setInputSearch(document.getElementById('txtTableSearch'));
// tableController.startSearch();

// tableController.sortBy('nombre', 'desc');

// console.log(document.getElementById('main-table').innerHTML = "")