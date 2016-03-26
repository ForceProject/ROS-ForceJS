jQuery(function ($) {
    // Add Other Scripts
    function appendScript(pathToScript) {
        var head = document.getElementsByTagName("head")[0];
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = pathToScript;
        head.appendChild(js);
    }
    appendScript("/js/global-elements.js");
    appendScript("/js/sidebar-stick.js");
    appendScript("/js/sidebar-toggle.js");
    appendScript("/js/SyntaxHighlighter_3-0-83.0/shCore.js");
    appendScript("/js/SyntaxHighlighter_3-0-83.0/shBrushPython.js");
    appendScript("/js/start-syntaxhighlighter.js");

    var body = $('#wrapper');
    //var sideNav = $('');

    $.ajax({
            url : "/html/Documentation/Python/sidenav.html",
            dataType: "text",
            success : function (data) {
                body.add(data).prependTo(body);
            }
        });

   // body.add(sideNav).appendTo(body);
});
