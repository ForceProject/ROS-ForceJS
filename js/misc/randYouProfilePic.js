jQuery(function ($) {
    var profile = $('#you-profile');
    var rand = Math.floor((Math.random() * 23) + 1);
    var imageName = rand + ".png";
    var imagePath = "/img/team/you/profile/" + imageName;
    profile.attr("src", imagePath);
});
