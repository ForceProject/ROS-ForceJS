$(document).ready(function () {
    $('.datatypeSection #toggle-python').click(function (e) {
        e.preventDefault();

        // Declare Variables
        var datatypeSection = $(this).parent();
        var colContainer = datatypeSection.parent();
        var codeDiv = datatypeSection.find('.code');

        // Open and Close
        codeDiv.toggleClass('code-toggled');

        // Read Classes
        var colContainerClasses = colContainer.attr('class');
        var colContainerClassesArr = colContainerClasses.split(' ');

        if (colContainerClassesArr[2] == 'col-lg-12') {
            var colContainerIds = colContainer.attr('id');
            colContainer.attr('class', colContainerIds);
            colContainer.attr('id', '');

            // Set the Button to Show
            $(this).text('Show Python');
        } else {
            // Set the id of the div to the classes for later reverting back
            colContainer.attr('id', colContainerClasses);

            // Remove the two md and lg classes
            for (var i = 1; i < 3; i++) {
                colContainer.removeClass(colContainerClassesArr[i]);
            }

            // Set the expanded
            colContainer.addClass('col-md-12');
            colContainer.addClass('col-lg-12');

            // Set the Button to Hide
            $(this).text('Hide Python');
        }
    });
});
