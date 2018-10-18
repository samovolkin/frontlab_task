class Fetcher extends Speaker {
    constructor({url, args = {}, mapper = ((x) => x), onError, subscribe}) {
        super(subscribe);
        this.url = url;
        this.args = args;
        this.onError = onError;
        this.mapper = mapper;
    }

    async fetch(query, args = this.args) {
        let request = `${this.url}${(query)? query : ''}`;


        for (let i in args) {
            request += `${i}=${args[i]}&`;
        }

        request = request.slice(0, -1);

        let response = await fetch(request);

        if (response.status != 200) {
            try {
                this.onError(response.statusText);
            } finally {
                return;
            }
        }

        response = await response.json();
        response = this.mapper(response);        
        this.share(response, 'onload');
    }
}
