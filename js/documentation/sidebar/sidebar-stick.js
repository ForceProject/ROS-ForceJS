$(document).ready(function(){
$.fn.followTo = function (pos) {
    var $this = this,
        $window = $(window);

    $window.scroll(function (e) {
        if ($window.scrollTop() < pos) {
            $this.css({
                position: 'absolute',
                top: $('header').height() + 150

                //($window.height() / 2)
            });
        } else {
            $this.css({
                position: 'fixed',
                top: 0,

                "-webkit-transition": "all 0.0s ease",
                "-moz-transition": "all 0.0s ease",
                "-o-transition": "all 0.0s ease",
                "transition": "all 0.0s ease"

            });
        }
    });
};
var topBarHeight = 150; // 48
//console.log($('section #header').height())
$('#sidebar-wrapper').followTo($('header').height() + 150);
})
