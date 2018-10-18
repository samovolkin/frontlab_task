class Component extends Speaker{
    constructor({target, parent = {target: document}, subscribe }) {
        super(subscribe);
        this.target = parent.target.querySelector(target);
    }

    onUpdate(data) {
        this.render(data);
    }

    render(data) {
        console.log(`Data to render: `);
        console.log(data);
    }

    get toHTML() {
        return this.target.innerHTML;
    }
}
