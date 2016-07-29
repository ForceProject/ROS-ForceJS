$(document).ready(function () {
    $('.accordion .acc-header').click(function (e) {
        e.preventDefault();

        var clear = $('<div class="clear"></div>');
        var content = $(this).closest('li').find('.content');
        content.add(clear).appendTo(content);

        var arrow = $(this).find('.arrow');
        var arrowtxt = arrow.text();
        if (arrowtxt == '↓') { // If down arrow
            arrow.text('↑');
        } else if (arrowtxt == '↑'){ // If up arrow
            arrow.text('↓');
        }

        // Open and Close
        $(this).closest('li').find('.content').not(':animated').slideToggle();
    });
});
