const page = new Page({
    components: [
        {
            type: Fetcher,
            options: {
                url: 'https://randomuser.me/api/?',            
                args: {
                    results: '50',
                    nat: 'gb,us',
                    inc: 'gender,name,location,email,phone,picture'
                },
                mapper: mapPeople
            },
            name: 'peopleFetcher'
        },
        {
            type: List,
            options: {
                target: '.list',
                heading: 'Random people',
                description: 'This information has been taken from <a href="https://randomuser.me">randomuser.me</a>',
                columns: [
                    {type: 'div', heading: 'Picture', attr:'style="background: url({{thumbnail}}) no-repeat 25% 50%;"', class: 'list__value--short'},
                    {name: 'fullName', heading: 'Full Name', sort: 'alphabetical', class: 'list__value--short'},
                ],
                items: [],
                styles: {
                    heading: 'list__heading',
                    description: 'list__description',                    
                    head: 'list__head',
                    column: 'list__column',
                    list: 'list__list',
                    item: 'list__item',
                    item__value: 'list__value'
                },
                settings: {
                    target: '.settings',
                    columns: [
                        {type: 'div', heading: 'Picture', attr:'style="background: url({{thumbnail}}) no-repeat 25% 50%;"', class: 'list__value--short', state: 'checked'},
                        {name: 'fullName', heading: 'Full Name', sort: 'alphabetical', class: 'list__value--short', state: 'checked'},
                        {name: 'name', heading: 'Name', sort: 'alphabetical', class: 'list__value--short'},
                        {name: 'street', heading: 'Street', sort: 'alphabetical', class: 'list__value--short'},
                        {name: 'state', heading: 'State', sort: 'alphabetical', class: 'list__value--short'},
                        {name: 'city', heading: 'City', sort: 'alphabetical', class: 'list__value--short'},
                        {name: 'phone', heading: 'Phone', sort: 'alphabetical', class: 'list__value--short'},
                        {name: 'email', heading: 'Email', sort: 'alphabetical', class: 'list__value--long'},
                    ],
                    styles: {
                        settings: 'settings',
                        legend: 'settings__legend',
                        item: 'settings__item'
                    }
                }
            },
            subscribe: {name: 'peopleFetcher', eventName: 'onload'},
            name: 'peopleList'
        },
        {
            type: Profile,
            options: {
                target: '.profile',
                visible: false,
                styles: {
                    profile: 'profile',
                    wrapper: 'popup-wrapper',
                    photo: 'profile__photo',
                    name: 'profile__name',
                    field: 'profile__field',
                    closeButton: 'profile__close-button',
                    hidden: 'profile--hidden',
                    field__key: 'profile__key',
                    field__value: 'profile__value',
                    background: 'profile__background',
                    background__container: 'profile__background-container',
                },
                fields: [
                    {title: 'Phone', key: 'phone'},
                    {title: 'Street', key: 'street'},
                    {title: 'City', key: 'city'},
                    {title: 'State', key: 'state'},
                    {title: 'Email', key: 'email'}
                ]
            },
            subscribe: {name: 'peopleList', eventName: 'itemClicked'}
        }
    ]
});

page.components[0].fetch();


function mapPeople(people) {
    return people.results.map((x) => {
        return {
            name: t.capitalizeAllWords(`${x.name.first} ${x.name.last}`),
            fullName: `${x.name.title}. ` + t.capitalizeAllWords(`${x.name.first} ${x.name.last}`),
            thumbnail: x.picture.medium,
            photo: x.picture.large,
            street: t.capitalizeAllWords(x.location.street),
            state: t.capitalizeAllWords(x.location.state),
            city: t.capitalizeAllWords(x.location.city),
            email: `<a href="mailto:${x.email}">${x.email}</a>`,
            phone: `<a href="tel:${x.phone}">${x.phone}</a>`
        }
    });
}
