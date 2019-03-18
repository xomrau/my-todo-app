/**
 * GENERAL SCRIPT
 */

const $ = require('jquery');
/*
document.addEventListener('DOMContentLoaded', function(e){ //func runs when DOM is ready indicates by the event type
    const checkboxes = document.getElementsByTagName('input'); //select all checkboxes using 'input' tag
    for (let i = 0; i < checkboxes.length; i++){// iterates over the checkboxes
        checkboxes[i].addEventListener('click', clickHandler); //assigns a clickHandler() to be run every time a checkbox is clicked
    }
});

// this func will add or rm the 'checked' css class from the span tag based on checkbox current's condition
function clickHandler(){
    if(this.checked){ //checked attribute is part of input checkbox type
        this.parentNode.className = 'checked';
    } else {
        this.parentNode.className = ' ';
    }

}
*/

//doesnt work as intended yet. When a todo entry is added, in the list, it shows 'undefined' despite register the right value in the db.
$(function() {
    $(':button').on('click', addTodo);
    $(':text').on('keypress', function(e) {
        var key = e.keyCode;
        if(key == 13 || key == 169) {
            addTodo();
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
});

var addTodo = function() {
    var text = $('#add-todo-text').val();
    $.ajax({
        url: '/api/todos', //url to which the request is sent
        type: 'POST', //def: GET. an alias for method
        data: {
            text: text
        },
        dataType: 'json', //datatype expecting back from server
        success: function(data) { //if request is success --> invoke the callback
            data.todo = text;
            var todo = data.todo;
            var newLiHtml = '<li><input type="checkbox"><span> ' + todo + '</span></li>';
            $('form + ul').append(newLiHtml);
            $('#add-todo-text').val('');
        }
    });
};

//jquery .on API attach a callback handler to each element that matches the selector
$(function() { // $(function(){...}) - replacement DOMContentLoaded events w jQuery's supports of document.ready()
    $('input').on('click', function() { //way to use selectors to get a ref to all the input elements on our page
        $(this).parent().toggleClass('checked');
    });
});