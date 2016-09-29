// Dean Attali / Beautiful Jekyll 2015

var ANTI_DRAG_COPY = false;

// Shorten the navbar after scrolling a little bit down
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar").addClass("top-nav-short");
    } else {
        $(".navbar").removeClass("top-nav-short");
    }
});

// On mobile, hide the avatar when expanding the navbar menu
$('#main-navbar').on('show.bs.collapse', function() {
    $(".navbar").addClass("top-nav-expanded");
})
$('#main-navbar').on('hidden.bs.collapse', function() {
    $(".navbar").removeClass("top-nav-expanded");
})

/* anti drag & copy */
$(document).ready(function(){
  if (ANTI_DRAG_COPY) {
      $(document).bind("contextmenu",function(){return false;});
      $(document).bind("mousedown",function(){return false;});
  }

  // for archive page
  $('.has-children').click(function() {
    $(this).find('.sub-title').slideToggle(300);
  });
});

// $(document).ready(function(){
//   $("pre.highlight").bind("contextmenu",function(){return false;});
//   $("pre.highlight").bind("mousedown",function(){return false;});
// });

// 2fc73a3a967e97599c9763d05e564189
