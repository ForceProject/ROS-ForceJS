var pContainerHeight = $('.jumbotron').height();

$(window).scroll(function(){

  var wScroll = $(this).scrollTop();

  if (wScroll <= pContainerHeight) {
    $('.sub').css({
      'transform' : 'translate(0px, '+ wScroll /6 +'%)'
    });
  }
});
