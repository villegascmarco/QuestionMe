class Table {
    //NODE ELEMENTS
    htmlTable;
    tbody;
    inputSearch;


    //PAGINATION SETUP
    itemsShown = 10;
    currentPage = 0;
    pages;
    btnPrev;
    btnNext;
    navigationButtons = [];
    buttonContainer;
    //SEARCH
    isSearching = false;
    searchData = [];

    //DESIGN
    svgLoaderSearch;
    //DATA
    data = [];
    columns = []
    paginatedData = [];

    constructor(htmlTable) {
        this.htmlTable = htmlTable;
        this.tbody = this.htmlTable.querySelector('tbody');
        // this.setUpPages();
    }

    setUpPages() {

        this.splitData();

        let flagAddBtnContainer = true;
        if (this.btnContainer) {
            this.btnContainer.innerHTML = "";
            this.navigationButtons = [];
            flagAddBtnContainer = false;
        } else {
            this.btnContainer = document.createElement('div');
            this.btnContainer.setAttribute('class', 'table-navigator');
            this.btnNext = document.createElement('button');
            this.btnPrev = document.createElement('button');
            this.btnNext.setAttribute('class', 'navigator-btn navigator-next')
            this.btnNext.innerText = 'Siguiente';
            this.btnPrev.setAttribute('class', 'navigator-btn navigator-prev')
            this.btnPrev.innerText = 'anterior';
            this.btnPrev.disabled = true;
            if (this.pages === 1) {
                this.btnNext.disabled = true;
            }

            this.btnPrev.addEventListener('click', () => this.previousPage());
            this.btnNext.addEventListener('click', () => this.nextPage());
        }


        this.btnContainer.appendChild(this.btnPrev);
        for (let i = 0; i < this.pages; i++) {
            let btn = document.createElement('button');
            btn.setAttribute('class', `navigator-btn navigator-page ${i===0?'active':''}`);
            btn.innerText = i + 1;
            btn.addEventListener('click', () => {
                if (this.pages === 1) {
                    return;
                }
                this.navigationButtons[this.currentPage].classList.remove('active');

                this.currentPage = i;

                this.navigationButtons[this.currentPage].classList.add('active');

                if (this.currentPage === (this.pages - 1)) {
                    this.btnNext.disabled = true;
                    this.btnPrev.disabled = false;
                }
                if (this.currentPage === 0) {
                    this.btnPrev.disabled = true;
                    this.btnNext.disabled = false;
                }

                this.showPage();

            });
            this.btnContainer.appendChild(btn);
            this.navigationButtons.push(btn);
        }
        this.btnContainer.appendChild(this.btnNext);
        // debugger
        if (flagAddBtnContainer) {
            this.htmlTable.parentNode.appendChild(this.btnContainer);
        }
    }

    splitData() {
        let data = this.data;
        if (this.isSearching) {
            data = this.searchData;
        }

        if (data.length > 0) {
            let page = [];
            let counter = 0;
            this.paginatedData = []; // console.log(this.data.length)
            data.forEach((item, index) => {
                if (counter++ < this.itemsShown) {
                    page.push(item);
                    if (index === (data.length - 1)) {
                        this.paginatedData.push(page);
                    }
                } else {
                    this.paginatedData.push(page);
                    page = []
                    counter = 1;
                    page.push(item);
                }
            })
        }
        this.pages = this.paginatedData.length;
        this.currentPage = 0;
    }

    previousPage() {
        if ((this.currentPage - 1) >= 0) {
            --this.currentPage;
        }
        if (this.currentPage < (this.pages - 1)) {
            this.btnNext.disabled = false;
        }
        if (this.currentPage === 0) {
            this.btnPrev.disabled = true;
        }
        this.updateProgress(false);
    }

    nextPage() {
        if (this.currentPage < this.pages) {
            ++this.currentPage;
        }
        //debugger
        if (this.currentPage === (this.pages - 1)) {
            this.btnNext.disabled = true;
        }
        if (this.currentPage > 0) {
            this.btnPrev.disabled = false;
        }
        this.updateProgress(true);
    }

    updateProgress(forward = true) {
        if (forward) {
            this.navigationButtons[this.currentPage - 1].classList.remove('active');
        } else {
            this.navigationButtons[this.currentPage + 1].classList.remove('active');
        }

        this.navigationButtons[this.currentPage].classList.add('active');

        this.htmlTable.dispatchEvent(new CustomEvent("progress", {
            detail: {
                direction: forward ? "FORWARD" : "REVERSE"
            }
        }))
        this.showPage();
    }

    createLoader() {
        // this.imgLoaderSearch = document.createElement('svg');
        let svg = `<svg version="1.1" id="Layer_1" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 1000 1000" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <g>
                <path d="M508.875,493.792L353.089,338.005c32.358-35.927,52.245-83.296,52.245-135.339C405.333,90.917,314.417,0,202.667,0
                    S0,90.917,0,202.667s90.917,202.667,202.667,202.667c52.043,0,99.411-19.887,135.339-52.245l155.786,155.786
                    c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125C513.042,504.708,513.042,497.958,508.875,493.792z
                    M202.667,384c-99.979,0-181.333-81.344-181.333-181.333S102.688,21.333,202.667,21.333S384,102.677,384,202.667
                    S302.646,384,202.667,384z">
                    <animateTransform attributeName="transform" type="translate" repeatCount="indefinite" dur="1s" values="0 0; 500 0;250 500;20 0" keyTimes="0;0.33;0.66;1">
                    </animateTransform>	
                </path>
            </g>
        </svg>`;

        this.svgLoaderSearch = new DOMParser().parseFromString(svg, "text/xml");
    }

    clear() {
        this.tbody.innerHTML = "";
    }

    showLoader(colspan = 6) {
        this.tbody.innerHTML = "";
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.setAttribute('colspan', colspan);
        this.createLoader();
        td.appendChild(this.svgLoaderSearch.documentElement);
        tr.appendChild(td);
        this.tbody.appendChild(tr);
    }

    showPage() {

        this.clear();

        this.paginatedData[this.currentPage].forEach((obj, index) => {
            if (typeof obj === 'object') {
                let row = document.createElement('tr');

                this.columns.forEach((col) => {

                    let cell = document.createElement('td');

                    if (typeof col['funct'] === 'function') {
                        cell.appendChild(col['funct'](obj));
                        row.appendChild(cell);
                        return;
                    }

                    cell.innerText = obj[col['column']];

                    row.appendChild(cell);

                });

                this.tbody.appendChild(row);
            }
        });
    }

    restartData() {
        this.data = [];
    }

    showData(options = {}) {

        this.data = options['data'];
        this.columns = options['columns'];
        this.setUpPages();

        this.showPage();

    }



    /**
     * 
     * @example
     * ordering using column 'lastname' in descendent order
     * sortBy('lastname','desc');
     * 
     * @example
     * ordering using column 'lastname' in ascendent order
     * sortBy('lastname','asc')
     * 
     * @param {string} columnName - name of the column used to sort data
     * @param {string} direction  - direction of sorting (ascendent / descendent)
     */
    sortBy(columnName, direction = 'asc') {

        const ORDER_CASE = {
            'asc': () => {
                this.data = this.data.sort((a, b) => a[columnName] > b[columnName] ? 1 : -1);
                this.setUpPages();
            },
            'desc': () => {
                this.data = this.data.sort((a, b) => a[columnName] > b[columnName] ? -1 : 1);
                this.setUpPages();
            },
        };

        let onlyColumns = this.columns.filter(el => Object.keys(el).includes('column'));
        if (onlyColumns.some(el => el['column'] === columnName)) {
            console.log('encontrada');

            (ORDER_CASE[direction]() || ORDER_CASE['asc'])();

        } else {

            throw new NoColumnError('La columna no existe en los datos dados.')
        }

    }

    setInputSearch(inputSearch) {
        this.inputSearch = inputSearch;
        this.inputSearch.addEventListener('keyup', () => {
            if (this.data.length === 0) {
                return;
            }
            this.startSearch();

            let text = this.inputSearch.value;
            let onlyColumns = this.columns.filter(el => Object.keys(el).includes('column'));
            let functions = this.columns.filter(el => Object.keys(el).includes('funct'));

            this.searchData = [];


            if (text.trim() === '') {

                this.isSearching = false;
                this.setUpPages();
                this.showPage();
                return;

            }

            this.data.forEach(element => {

                let isInFunct = functions.some(el => String((el['funct'](element).innerText || el['funct'](element).innerHTML)).toLowerCase().includes(String(text).toLowerCase()));

                let isInColumn = onlyColumns.some(el => String(element[el['column']]).toLowerCase().includes(String(text).toLowerCase()))

                if (isInColumn || isInFunct) {
                    this.searchData.push(element);
                }

            });
            this.setUpPages();
            this.showPage();
        });
    }

    startSearch() {
        if (!this.isSearching) {
            this.isSearching = true;
        }
        this.clear();
        // this.showLoader();
    }


}

class TableFormatError extends Error {
    constructor(message) {
        super(message);
        this.name = "TableFormatError";
    }
}

class NoColumnError extends Error {
    constructor(message) {
        super(message);
        this.name = "NoColumnFound"
    }
}