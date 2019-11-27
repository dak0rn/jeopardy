requirejs(['jeopardy'], function(Jeopardy) {
    const j = new Vue(Jeopardy);

    j.$mount(document.querySelector('main'));
});
