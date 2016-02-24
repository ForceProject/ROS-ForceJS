jQuery(function ($) {
    var head = $('head');

    var body = $('body');
    //var sideNav = $('');

    $.ajax({
            url : "/html/top-nav.html",
            dataType: "text",
            success : function (data) {
                body.add(data).prependTo(body);
            }
        });

   // body.add(sideNav).appendTo(body);
});
