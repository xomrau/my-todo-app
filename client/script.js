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


//jquery .on API attach a callback handler to each element that matches the selector
$(function() { // $(function(){...}) - replacement DOMContentLoaded events w jQuery's supports of document.ready()
    $('input').on('click', function() { //way to use selectors to get a ref to all the input elements on our page
        $(this).parent().toggleClass('checked');
    });
});