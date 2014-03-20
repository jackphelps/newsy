
$(document).on("scroll",function() {
  if ( $('.navbar').hasClass('big-nav') || $('.navbar').hasClass('small-nav') ) {
    if ($(document).scrollTop() > 0) {
        $('.navbar').removeClass('big-nav').addClass('small-nav');
        $('.spacer-div').removeClass('body-lowered').addClass('body-raised');
    } else {
        $('.navbar').removeClass('small-nav').addClass('big-nav');
        $('.spacer-div').removeClass('body-raised').addClass('body-lowered');
    }
  }
});