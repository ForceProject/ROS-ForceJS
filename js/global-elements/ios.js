jQuery(function ($) {
    var head = $('head');

    var links = $('\
    <!-- Side Bar Template -->\
    <link href="/css/documentation/sidebar.css" rel="stylesheet">\
    <!-- Accordion -->\
    <link href="/css/foundation/accordion.css" rel="stylesheet">\
    <!-- Syntax Highlighter -->\
    <link href="/css/SyntaxHighlighter_3-0-83.0/shCore.css" rel="stylesheet">\
    <link href="/css/SyntaxHighlighter_3-0-83.0/shThemeDefault.css" rel="stylesheet">\
    ');

    head.add(links).appendTo(head);

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
    appendScript("/js/documentation/sidebar/accordion.js");
    appendScript("/js/SyntaxHighlighter_3-0-83.0/shCore.js");
    appendScript("/js/SyntaxHighlighter_3-0-83.0/shBrushPython.js");
    appendScript("/js/documentation/code/start-syntaxhighlighter.js");

    var body = $('#sidebar-wrapper');
    //var sideNav = $('');

    $.ajax({
            url : "/Documentation/iOS/sidenav.html",
            dataType: "text",
            success : function (data) {
                body.add(data).appendTo(body);
            }
        });

   // body.add(sideNav).appendTo(body);
});
