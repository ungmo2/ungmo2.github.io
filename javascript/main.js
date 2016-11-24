jQuery(document).ready(function ($) {

  // Interactions

  var $toggle = $('#toggle');
  var $down = $('#down');
  var $overlay = $('#overlay');
  var $top = $('#top');
  var $banner = $('#banner');
  var $newsletter = $('#newsletter');

  $toggle.click( function() {
    $('html').addClass('open-menu');
  });

  $down.click( function() {
    $('html').addClass('open-navigation');
  });

  $top.click( function() {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  $banner.click( function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $newsletter.offset().top
    }, 500);
  });

  $overlay.click( function() {
    $('html').removeClass('open-menu').removeClass('open-navigation');
  });

  // TYPED.JS
  $("#typed").typed({
    strings: [
      "HTML5.", "CSS3.", "Sass.", "Bootstrap.", "JavaScript.", "jQuery.",
      "Node.js.", "Express.", "Socket.io.", "MongoDB."
    ],
    typeSpeed: 120,
    startDelay: 0,
    backSpeed: 80,
    backDelay: 800,
    loop: true
  });

  // Scroll to next section
  $('#scroll-icon').click( function() {
    $('html, body').animate({
      scrollTop: ($('.index-title').offset().top)
    }, 1000);
  });

  //////////////////////////////////////////////////////////////////////
  // <p class="result"></p> 대응
  // 해당 요소 이전에 기술된 가장 인접한 형제 요소 중 highlighter에서 html을 취득하여 iframe에 삽입
  //////////////////////////////////////////////////////////////////////

  $('.result').each(function() {

    var $this = $(this);

    // 이미 result 내부에 내용이 있으면 skip
    if($this.html()){
      return true; // for문의 continue;와 같다.
    }

    $this.append('<iframe></iframe>');

    var html = $this.prevAll('.highlighter-rouge:first').find('code').text();
    var iframe = $this.children(':first')[0];

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    // container height = iframe height
    $this.height(iframe.contentWindow.document.body.scrollHeight);
  });

  //////////////////////////////////////////////////////////////////////
  // Code highlighter를 변경 가능하도록 contenteditable 속성 추가
  // Code highlighter 변경 시 result 동기화
  //////////////////////////////////////////////////////////////////////
/*
  $('.language-html.highlighter-rouge').prop('contenteditable', true);

  $('body').on('focus', '.highlighter-rouge[contenteditable]', function() {
    var $this = $(this);
    var html = $this.find('code').text();

    $this.data('before', html);

    return $this;
  }).on('keydown', '.highlighter-rouge[contenteditable]', function(e) {
    var $this = $(this);

    // enter key
    if (e.keyCode === 13) {
      console.log("Enter Key");
      // document.execCommand('insertHTML', false, '<br>');
      document.execCommand('insertHTML', false, '\n');

      // prevent the default behaviour of return key pressed
      return false;
    }

    // tab key
    if (e.keyCode === 9) {
      document.execCommand('insertHTML', false, '  ');
      return false;
    }

    return $this;
  }).on('blur keyup paste input', '.highlighter-rouge[contenteditable]', function() {
    var $this = $(this);
    var before_html = $this.data('before');
    var changed_html = $this.find('code').text();

    if (before_html !== changed_html) {
      var container = $this.nextAll('.result:first');
      var iframe = container.find('iframe')[0];

      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(changed_html);
      iframe.contentWindow.document.close();

      // container height = iframe height
      container.height(iframe.contentWindow.document.body.scrollHeight);
    }
    return $this;
  });
*/
});
