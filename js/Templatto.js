class Templatto {
    constructor() {}

    static replace(item, template, insteadOfMissing = '') {
        return template.replace(/{{(\w+)}}/g, (str, property) => {
            return item[property] || insteadOfMissing;
        });
    }

    static forEach(items, template, insteadOfMissing = '') {
        return items.reduce((html, item, insteadOfMissing) => {
            return html + Templatto.replace(item, template);
        }, '');
    }

    static capitalizeAllWords(string) {
        return string.replace(/\b\w/g, x => x.toUpperCase());
    }
}

const t = Templatto;