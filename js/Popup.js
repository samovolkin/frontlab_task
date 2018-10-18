class PopUp extends Component {
    constructor({styles, visible, ...options}) {
        super(options);

        this.styles = styles;
        this.initWrapper();
        this.visible = visible || false;

        this.wrapper.addEventListener('click', event => {
            let targetClasses = event.target.classList;
            if (targetClasses.contains(this.styles.closeButton) || targetClasses.contains(this.styles.wrapper)) {
                this.visible = false;
            }
        });

    }

    initWrapper() {
        let parentNode = this.target.parentNode;
        this.wrapper = document.createElement('DIV');
        this.wrapper.className = this.styles.wrapper || '';
        parentNode.removeChild(this.target);
        this.wrapper.appendChild(this.target);
        parentNode.appendChild(this.wrapper);
    }

    set visible(state) {
        if(state) {
            this.wrapper.classList.remove(this.styles.hidden);
        } else this.wrapper.classList.add(this.styles.hidden);
    }
}
