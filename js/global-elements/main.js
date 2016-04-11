jQuery(function ($) {
    var head = $('head');

    $.ajax({
            url : "/html/links.html",
            dataType: "text",
            success : function (data) {
                head.add(data).appendTo(head);
            }
        });

    var body = $('body');
    //var sideNav = $('');

    $.ajax({
            url : "/html/top-nav.html",
            dataType: "text",
            success : function (data) {
                body.add(data).prependTo(body);
            }
        });

   // Add Other Scripts
    function appendScript(pathToScript) {
        var head = document.getElementsByTagName("head")[0];
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = pathToScript;
        head.appendChild(js);
    }
    appendScript("/js/foundation/modernizr-2.6.2.min.js");
});
