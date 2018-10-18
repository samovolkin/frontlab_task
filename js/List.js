class List extends Component {
    constructor({ items, columns, heading, description, styles, settings, ...options }) {
        super(options);
        this.items = items;                 // Содержимое списка     
        this.styles = styles;               // Стили
        this.columns = columns;             // Информация о столбцах
        this.heading = heading;             // Заголовок списка
        this.description = description;     // Описание списка
        this.index = 0;
        this.reversed = false;

        this.target.innerHTML = `
        <h1 class="${styles.heading}">${this.heading}</h1>    
        <p class="${styles.description}">${this.description}</p>
        <div class="${styles.head}"></div>
        <div class="${styles.list}"></div>`;

        this.head = this.target.querySelector(`.${styles.head}`);
        this.list = this.target.querySelector(`.${styles.list}`);

        this.initHead();
        this.initItemTemplate();
        this.render();

        this.target.addEventListener('click', (event) => {
            let targetClassList = event.target.classList;
            if (targetClassList.contains(this.styles.column)) {
                let elements = this.target.querySelectorAll('.' + this.styles.column);
                let index = Array.prototype.indexOf.call(elements, event.target);
                let wayToSort = this.columns[index].sort;

                if (wayToSort == undefined || wayToSort == 'none') return;

                if (this.index == index) {
                    this.reversed = !this.reversed;
                }

                let sortSymbol = {false: '▵', true: '▿'}[this.reversed];

                elements[this.index].textContent = this.columns[this.index].heading;
                elements[index].textContent = this.columns[index].heading + sortSymbol;
                this.index = index;

                this.sort(index);
            }

            if (targetClassList.contains(this.styles.item)) {
                let elements = this.target.querySelectorAll('.' + this.styles.item);
                let index = Array.prototype.indexOf.call(elements, event.target);

                this.share(this.items[index], 'itemClicked');
            }

            if (targetClassList.contains(this.styles.item__value)) {
                let elements = this.target.querySelectorAll('.' + this.styles.item__value);
                let index = Array.prototype.indexOf.call(elements, event.target);

                index = Math.floor(index / this.columns.length);

                this.share(this.items[index], 'itemClicked');
            }
        });

        if (settings) {
            this.settings = new ListSettings(settings);
            this.subscribe(this.settings, 'settingsChanged');
        }
    }

    initHead() {
        this.head.innerHTML = t.forEach(this.columns, `<div class="${this.styles.column} {{class}}">{{heading}}</div>`);
    }

    initItemTemplate() {
        let item =  this.columns.reduce((html, column) => {
            return html + `<${column.type || 'span'} class="${this.styles.item__value} ${column.class || ''}" ${column.attr || ''}>${(column.name) ? `{{${column.name}}}`: ''}</${column.type || 'span'}>`;
        }, '');
        
        this.itemTemplate = `<div class="${this.styles.item}">${item}</div>`;
    }

    onUpdate(data, eventName) {
        if (eventName == 'settingsChanged') {
            this.columns = data;
            this.initHead();
            this.initItemTemplate();
            this.render();
        }

        if (eventName == 'onload') {
            this.items = data;
            this.render();
        }
    }

    sort(collumnIndex) {
        this.items = this.items.sort( (List.sort[this.columns[collumnIndex].sort])(this.columns[collumnIndex].name) );
        if (this.reversed) this.items.reverse();
        this.render();
    }    

    render() {
        this.list.innerHTML = `${t.forEach(this.items, this.itemTemplate)}`
    }
}

List.sort = {
    'numerical': function(name) {
        return (a, b) => a[name] - b[name]; 
    },
    'alphabetical': function(name) {
        return (a, b) => a[name].localeCompare(b[name]);
    }
}


class ListSettings extends Component {
    constructor({columns, styles, ...options }) {
        super(options);
        this.columns = columns;
        this.styles = styles;

        this.target.innerHTML = `
        <div class="${styles.settings}">
            <legend class="${styles.legend}"></legend>
            ${t.forEach(this.columns, `
            <div class="${styles.item}">
                <input type="checkbox" {{state}}><label>{{heading}}</label>
            </div>`)}
        </div>`;

        this.target.addEventListener('click', event => {
            if (event.target.nodeName == 'INPUT') {
                let checkboxes = this.target.querySelectorAll('input[type="checkbox"]');

                let selectedColumns = [];
                checkboxes.forEach((checkbox, index) => {
                    if (checkbox.checked) {
                        selectedColumns.push(this.columns[index]);
                    }
                });

                this.share(selectedColumns, 'settingsChanged');
            }
        });
    }
}