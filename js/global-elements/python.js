jQuery(function ($) {

        var body = $('#wrapper');
    //var sideNav = $('');

    $.ajax({
            url : "/Documentation/Python/sidenav.html",
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
    appendScript("/js/global-elements/main.js");
    appendScript("/js/documentation/sidebar/sidebar-stick.js");
    appendScript("/js/documentation/sidebar/sidebar-toggle.js");
    appendScript("/js/SyntaxHighlighter_3-0-83.0/shCore.js");
    appendScript("/js/SyntaxHighlighter_3-0-83.0/shBrushPython.js");
    appendScript("/js/documentation/code/start-syntaxhighlighter.js");

   // body.add(sideNav).appendTo(body);
});
