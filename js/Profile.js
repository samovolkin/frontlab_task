class Profile extends PopUp {
    constructor({ fields, ...options }) {
        super(options);
        this.fields = fields;
        this.initTemplate();
    }

    initTemplate() {
        let {photo, name, field, 
            field__key, field__value, 
            closeButton, background, 
            background__container} = this.styles;

        this.template = `
        <div class="${closeButton}"></div>
        ${(photo) ? 
        `<div class="${background__container}"><div class="${background}" style="background-image: url({{photo}})"></div></div>
        <img class="${photo}" src="{{photo}}">` : ''}
        <h2 class="${name}">{{name}}</h2>
        ${t.forEach(this.fields, `<div class="${field}">
        <span class="${field__key}">{{title}}</span> <span class="${field__value}">{{{{key}}}}</span>
        </div>`)}`;
    }

    render(data) {
        this.target.innerHTML = t.replace(data, this.template);
        this.visible = true;
    }
}