$(document).ready(function () {
    $('.datatypeSection #toggle-python').click(function (e) {
        e.preventDefault();

        // Declare Variables
        var datatypeSection = $(this).parent();
        var colContainer = datatypeSection.parent();
        var dataStructure = datatypeSection.find('.dataStructure');
        var codeDiv = datatypeSection.find('.hidden-code');

        // Open and Close
        codeDiv.toggleClass('hidden-code-toggled');

        // Read Classes
        var colContainerClasses = colContainer.attr('class');
        var colContainerClassesArr = colContainerClasses.split(' ');

        if (colContainerClassesArr[2] == 'col-lg-12') {
            // HIDE THE CODE

            var colContainerIds = colContainer.attr('id');
            colContainer.attr('class', colContainerIds);
            colContainer.attr('id', '');

            dataStructure.removeClass('col-lg-4');
            codeDiv.removeClass('col-lg-8');

            codeDiv.find('h3').remove();

            // Set the Button to Show
            $(this).text('Show Python');
        } else {
            // SHOW THE CODE

            // Set the id of the div to the classes for later reverting back
            colContainer.attr('id', colContainerClasses);

            // Remove the two md and lg classes
            for (var i = 1; i < 3; i++) {
                colContainer.removeClass(colContainerClassesArr[i]);
            }

            // Set the expanded
            colContainer.addClass('col-md-12');
            colContainer.addClass('col-lg-12');

            // Some more
            dataStructure.addClass('col-lg-4');
            codeDiv.addClass('col-lg-8');

            codeDiv.prepend('<h3>Usage Demo</h3>')

            // Set the Button to Hide
            $(this).text('Hide Python');
        }
    });
});
