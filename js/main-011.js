// Expand / contract header 
/*
$(function() {
  if ( $('.navbar').hasClass('big-nav') || $('.navbar').hasClass('small-nav') ) {
    $(document).on("scroll",function() {
        if ($(document).scrollTop() > 0) {
            $('.navbar').removeClass('big-nav').addClass('small-nav');
            $('.spacer-div').removeClass('body-lowered').addClass('body-raised');
        } else {
            $('.navbar').removeClass('small-nav').addClass('big-nav');
            $('.spacer-div').removeClass('body-raised').addClass('body-lowered');
        };
    });
  };
});
*/

// Prevent search dropdown from closing on click
$(function() {
  $('.dropdown input, .dropdown label').click(function(e) {
    e.stopPropagation();
  });
});

//set up search
$(function() {
  $('#search-text').hide();
  $('#search-container').on('mouseover', function() {
    $('#search-text').show();
    $('#search-text').focus();
  });
  $('#search-container').on('mouseout', function() {
    $('#search-text').hide();
  });
});

//tapir search results
//$('.search-results').Tapirus('5331ad17dc0a3a0200000000');

// ======= link behavior ====================

// we like all links inside main post content to open in new tabs automatically -- they're frequently citations and we
// don't want to disrupt reading experience

$('.post-content a').attr('target','_blank');

// ======= post tweaking hooks ==============

// include post-tweaking hooks inside the main image's alt value
// currently assumes entire alt value is subtitle. will add tags surrounded by {{FOO}} to specify behavior.
// !!! NOTE !!! single quotes in the alt will break the shit out of ghost, nothing we can do about it here. 
// make sure authors use &rsquo; instead of '

// post summary view (e.g. on index)
$(function postSummaryTweaks() {
  $('.post-summary-img').each( function() {
    if ($(this).children('p') && $(this).children('p').children('img') && $(this).children('p').children('img').attr('alt')) {
      var subtitle = $(this).children('p').children('img').attr('alt');
      $(this).children('.post-summary-subtitle').html(subtitle);
      //rough word count lets us easily adjust css for subtitle text sizing
      var words = subtitle.split(' ').length;
      if (words > 18) {
        $(this).children('.post-summary-subtitle').css('font-size','1.15em');
      } else if (words < 8) {
        $(this).children('.post-summary-subtitle').css('font-size','1.6');
      }
    } else {
      $(this).children('div').removeClass('post-summary-subtitle');
    }
  });
});
//full post view
$(function fullpostTweaks() {
  $('.hideable').hide();
  $('.post-top').show();
  if ($('.post-image p img')) {
    var img = $('.post-image p img');
    var subtitle = img.attr('alt');
    var tmp = subtitle.split(' ');
    //this is the hackiest thing I've ever done -- let's make sure there aren't 1 or 2 orphaned words at the end of the subtitle
    //this works because the text is wide enough that nobody will notice but could produce weird results on mobile
    tmp[tmp.length-2] = tmp[tmp.length-2] + '&nbsp;' + tmp[tmp.length-1];
    tmp.pop(tmp[tmp.length-1]);
    subtitle = tmp.join(' ');
    $('.post-subtitle h3').html(subtitle);
    $('.post-content p:first').hide();
    $(window).on("resize", function () {
      //make the subtitle section occupy the entire part of the window not occupied by the image
      if ($(window).width() > 1100) {
        var offheight = $(window).height() - $('.post-top').height();
          $('.post-subtitle').css('padding-top','+='+offheight / 2);
          $('.post-subtitle').css('padding-bottom','+='+offheight / 2);
      }
      // smooth parallax of top image
      $(document).on("scroll",function() {
        // shows whitespace when scrolling up to top if you don't force it not to go negative
        if ($(document).scrollTop() >= 0) {
          $('.static-img').css('top', -1 * ($(document).scrollTop() / 3));
        } else {
          $('.static-img').css('top', 0);
        }
      });
    }).resize();
  }

});


