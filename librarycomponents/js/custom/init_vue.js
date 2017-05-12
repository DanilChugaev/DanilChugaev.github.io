// (function(){
    Vue.component('list-components', {
        props: ['item'],
        template:
            '<li>' +
                '<a :href="item.url">' +
                    '<span data-lang="ru">{{ item.ru }}</span>' +
                    '<span data-lang="en">{{ item.en }}</span>' +
                    '' +
                '</a>' +
            '</li>'
    });
    var vmComponent = new Vue({
        el: "#js-list-components",
        data: {
            components: []
        },
        mounted() {
            fetch('json/components.json').then(c => c.json()).then((data) => {
                this.components = data;
            })
        }
    });
// })();