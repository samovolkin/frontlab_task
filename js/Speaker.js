class Speaker {
    constructor(subscribe) {
        this.events = {};
        if (subscribe) this.subscribe(subscribe);
    }

    addSubscriber(sub, eventName) {
        this.events[eventName] = this.events[eventName] || [];

        if (this.events[eventName].includes(sub)) {
            console.warn(`Object is already in sub-list`);
        } else this.events[eventName].push(sub);
    }

    removeSubscriber(sub, eventName) {
        if (this.events[eventName]) {
            this.events[eventName].filter(x => x != sub);
        }
    }

    subscribe(obj, eventName) {
        obj.addSubscriber(this, eventName);
        console.log('Subscribed!');
    }

    unsubscribe(obj, eventName) {
        obj.removeSubscriber(eventName, this);
    }

    share(data, eventName) {
        if (this.events[eventName] === undefined) {
            console.warn('There are no subscribers!');
            return;
        }

        this.events[eventName].forEach(sub => {
            new Promise(() => {
                sub.onUpdate(data, eventName)
            });
        });
    }

    onUpdate(data, eventName) {
        console.log(`Got this: ${data}`);
    }
}