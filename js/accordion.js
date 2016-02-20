$(document).ready(function () {
    $('.accordion .header').click(function (e) {
        e.preventDefault();

        // Anything Necessary
        //$(this).closest('li').find('img').elevateZoom({scrollZoom : true}); // For Images in the Article Accordion
        //$('aside img').elevateZoom({zoomWindowPosition: 10, zoomWindowOffetx: -10, scrollZoom : true}); // For Images in the Aside Accordion

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
