class Page {
    constructor({ components }) {
        this.components = [];   // Компоненты
        let names = {};         // Имена для подписок
        

        components.forEach(({ type, options, subscribe, name }) => {
            let component = new type(options);
    
            if (subscribe) {
                let publisher = names[subscribe.name];  // subscribe?.name :(
                component.subscribe(publisher, subscribe.eventName);
            }

            if (name) names[name] = component;
            this.components.push(component);
        });
        
        console.table(names);
    }
}