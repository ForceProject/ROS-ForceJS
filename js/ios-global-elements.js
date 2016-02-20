jQuery(function ($) {
    var head = $('head');
    var links = $('\
            <!-- FavIcon -->\
            <link rel="icon" type="image/png" href="../src/img/sixteen-logo-48px-stroke.png">\
            <!-- Fonts -->\
            <!-- PT Sans -->\
            <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,300,600&subset=latin,latin-ext" rel="stylesheet" type="text/css">\
            <!-- Crete Roung -->\
            <link href="http://fonts.googleapis.com/css?family=Crete+Round&subset=latin,latin-ext" rel="stylesheet" type="text/css">\
            <!-- CSS -->\
            <link rel="stylesheet" href="../css/fonts.css" />\
            <link rel="stylesheet" href="../css/header-&-footer.css" />\
            <link rel="stylesheet" href="../css/headroom.css" />\
            <link rel="stylesheet" href="../css/body.css" />\
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
    appendScript("../js/jQuery.headroom.js");
    appendScript("../js/headroom.js");
    appendScript("../js/activate-headroom.js");
    appendScript("../js/up.js")

    var body = $('body');
    var sideNav = $("<header class='headroom'>\
                        <nav>\
                            <div class='container'>\
                                <a href='home.html' class='company'>\
                                    <img src='../src/img/sixteen-logo-48px-stroke.png' class='logo'>\
                                    <p>\
                                        Jordan Lewis\
                                    </p>\
                                </a>\
                                <ul class='mainMenu'>\
                                    <li><a href='home.html' title='Home'>Home</a></li>\
                                    <li><a href='ipo-model.html' title='Information on the Input Processing and Output Model'>IPO - Model</a></li>\
                                    <li><a href='storage-&-processing.html' title='A run down on storage and a little bit on processing.'>Storage & Processing</a></li>\
                                    <li><a href='anatomy-of-computer.html' title='The Anatomy of a Computer 101'>Anatomy of a Computer</a></li>\
                                    <li><a href='maintenance.html' title='How to keep your computer healthy. Maintenance Tips.'>Computer Maintenance</a></li>\
                                    <li><a href='gaming-vs-office.html' title='The difference in build of a gaming computer and an office computer.'>Gaming vs Office PC</a></li>\
                                    <li><a href='franks-gaming-cafe.html' title='A run down on how Frank's Gaming Cafe is going to work.'>Frank's Gaming Cafe</a></li>\
                                </ul>\
                            </div>\
                           </nav>\
                       </header>");

    body.add(sideNav).appendTo(body);
});
