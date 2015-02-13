// ======= link behavior ====================

// we like all links inside main post content to open in new tabs automatically -- they're frequently citations and we
// don't want to disrupt reading experience

$('.post-content a').attr('target','_blank');

// ======= post tweaking hooks ==============

// include post-tweaking hooks inside the main image's alt value
// currently assumes entire alt value is subtitle. will add tags surrounded by {{FOO}} to specify behavior.
// !!! NOTE !!! single quotes in the alt will break the shit out of ghost, nothing we can do about it here.
// make sure authors use &rsquo; instead of '

//detect mobile browsers
  /**
   * jQuery.browser.mobile (http://detectmobilebrowser.com/)
   *
   * jQuery.browser.mobile will be true if the browser is a mobile device
   *
   **/
  (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

// post summary view (e.g. on index)
$(function postSummaryTweaks() {
  if ($('#page-type').html() == "index") {
    $('.post-summary-img').each( function() {
      if ($(this).children('p') && $(this).children('p').children('img') && $(this).children('p').children('img').attr('alt')) {
        var subtitle = $(this).children('p').children('img').attr('alt');
        $(this).children('.post-summary-subtitle').html(subtitle);
        // rough word count lets us easily adjust css for subtitle text sizing
        var words = subtitle.split(' ').length;
        if (words > 18) {
          $(this).children('.post-summary-subtitle').css('font-size','1.15em');
        } else if (words < 11) {
          $(this).children('.post-summary-subtitle').css('font-size','2em');
        }
      } else {
        $(this).children('div').removeClass('post-summary-subtitle');
      }
    });

    // Sticky sidebar and smooth parallax of top image
    // iOS holds on scrolls, so this is not smooth; we only do this for non-mobile devices currently
    if (!jQuery.browser.mobile) {

      var sidebarTop = $('.sidebar').offset().top;
      // we'll make sure we maintain the sidebar's width since we're bumping it out of position
      var sidebarWidth = $('.sidebar').width();

      $(document).on("scroll",function() {

        // move the sidebar with the window if it's above the top
        var top = $(document).scrollTop()
        if (sidebarTop < top + 10) {
          $('.sidebar').css({ position: 'fixed', top: 10, width: sidebarWidth });
        }
        else {
          $('.sidebar').css('position','static');
        }

        // shows whitespace when scrolling up to top if you don't force it not to go negative
        if (top >= 0) {
          $('.background').css('top', -1 * (top / 2));
        } else {
          $('.background').css('top', 0);
        }

      });
    }
  }
});
// full post view
$(function fullpostTweaks() {
  if ($('#page-type').html() == "post") {
    var img = $('.post-content p:first img');
    var subtitle = img.attr('alt');
    var tmp = subtitle.split(' ');
    // this is the hackiest thing I've ever done -- let's make sure there aren't 1 or 2 orphaned words at the end of the subtitle
    // this works because the text is wide enough that nobody will notice but could produce weird results on mobile
    tmp[tmp.length-2] = tmp[tmp.length-2] + '&nbsp;' + tmp[tmp.length-1];
    tmp.pop(tmp[tmp.length-1]);
    subtitle = tmp.join(' ');
    $('.hero-subtitle h4').html(subtitle);
    $('.post-content p:first').hide();
    $(window).on("resize", function () {
      // smooth parallax of top image
      // iOS holds on scrolls, so this is not smooth; we only do this for non-mobile devices currently
      if (!jQuery.browser.mobile) {
        $(document).on("scroll",function() {
          // shows whitespace when scrolling up to top if you don't force it not to go negative
          if ($(document).scrollTop() >= 0) {
            $('.static-img').css('top', -1 * ($(document).scrollTop() / 2));
          } else {
            $('.static-img').css('top', 0);
          }
        });
      }
    }).resize();
  }

});


