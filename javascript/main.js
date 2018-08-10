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
      "HTML5.", "CSS3.", "Sass.", "Bootstrap.", "JavaScript.", "ES6.", "jQuery.", "Node.js.", "Express.", "Socket.io.", "MongoDB.", "TypeScript.", "Angular."
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
      // scrollTop: ($('.index-title').offset().top)
      scrollTop: ($('.book').offset().top - 50)
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
      return true;
    }

    $this.append('<iframe></iframe>');

    // var html = $this.prevAll('.highlighter-rouge:first').find('code').text();
    // var iframe = $this.children(':first')[0];

    // Codemirror 대응
    var html = $this.prev('pre').find('code').text();
    var iframe = $this.children(':first')[0];

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    // result 요소에 스타일 지정이 없으면 자동으로 height 계산
    /*
    <div class='result' style="height: 136px;"></div>
    => style의 height 우선 적용
    */
    if (!$this.attr('style')) {
      // container height = iframe height + 30
      $this.height(iframe.contentWindow.document.body.scrollHeight + 30);
    }
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
  var createCookie = function(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  };

  var readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };

  // Div opacity based on scrollbar position
  var fadeStart = 100;
  var fadeUntil = 350;
  var $fadingTarget = $('.hello');

  $(window).on('scroll', function(){
    var offset = $(document).scrollTop(),
        opacity = 0;

    if( offset <= fadeStart ){
      opacity = 1;
    }else if( offset <= fadeUntil ){
      opacity = 1 - offset/fadeUntil;
    }

    $fadingTarget.css('opacity', opacity);

    // Facebook like box
    var $content = $('.content');
    var $fbLikeBox = $('.fb-like-box');
    var slideStart = $content.innerHeight() - 400;

    if(offset > slideStart) {
      // $fbLikeBox.fadeIn('slow');
      if(!$fbLikeBox.hasClass('active')) {
        var cancel = readCookie('c');
        if(!cancel) {
          $fbLikeBox.addClass('active');
        }
      }
    } else {
      // $fbLikeBox.fadeOut('slow');
      $fbLikeBox.removeClass('active');
    }
  });

  // Facebook like plugin 닫기 버튼
  $('.close').on('click touch', function(event) {
    event.preventDefault();
    // Get Cookie
    var cancel = readCookie('c');
    console.log(cancel);

    if(!cancel) {
      // Set Cookie
      createCookie('c', '1');
    }
    $('.fb-like-box').removeClass('active');
  });

  // detect mobile : stackblits 버그 대응
  var filter = "win16|win32|win64|mac|macintel";
  if ( navigator.platform ) {
    // mobile로 접속한 경우, stackblits iframe 요소를 제거
    if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
      $('iframe[src^="https://stackblitz.com"]').remove();
    }
  }
});
