
jQuery(document).ready(function ($) {

  var $breadcrumb = $('#breadcrumb');
  var $goto_toc = $('.breadcrumb-toc');
  var $markdown_toc = $('#markdown-toc');
  var $toc = $('#menu');
  var $list = $toc.children('ul');
  var $headings = $('.content h1, .content h2, .content h3, .content h4, .content h5');
  var $open = $('#open');
  var $close = $('#close, #overlay');

  // markdown-toc이 있으면 breadcrumb메뉴에 list icon 추가
  if ($markdown_toc.length) {
    var html = '<a class="breadcrumb-toc" href="javascript:void(0)">';
        html += '<i class="fa fa-list-ol"></i>';
        html += '<span>Go to table of contents</span></a>';

    $breadcrumb.append(html);
  }

  // Create toc
  if ($headings.length) {
    $headings.each(function() {
      var $el = $(this);
      var id = $el.attr('id');
      if (id) {
        $list.append(
          $('<li />').append(
            $('<a />')
            .text($el.text())
            .attr('href', '#' + id)
          )
        );

        // headings에 링크를 표시하는 마크를 추가한다
        $el.prepend(
          $('<a />')
          .addClass('header-link')
          .attr('href', '#' + id)
          .html('#')
        );
        return;
      }
    });
  } else {
    $toc.hide();
  }

  $breadcrumb.affix({
    offset: {
      top: $breadcrumb.offset().top
    }
  });

  $open.click(function() {
    $('html').addClass('has-menu-open');
  });

  $close.click(function() {
    $('html').removeClass('has-menu-open');
  });

  // TOC Control
  $('.breadcrumb-toc').click(function(){
    $markdown_toc.slideToggle(300);

    $('html, body').animate({
      scrollTop: ($('.page-content').offset().top)
    }, 1000);
    return false;
  });

  // Heading link Control
  $('.header-link').click(function(){
    // 헤더의 링크를 클릭했을 때, 언제나 toc를 표시하고(토글되지 않고) toc로 Scrooll한다
    if(!$markdown_toc.is(":visible")) {
      $markdown_toc.slideToggle(300);
    }

    $('html, body').animate({
      scrollTop: ($('.page-content').offset().top)
    }, 1000);
    return false;
  });

  /////////////////////////
  // CodeMirror
  CodeMirror.modeURL = '/assets/vendor/codemirror/mode/%N/%N.js';
  var codeBlocks = document.querySelectorAll('pre > code');

  function parseMode(mode) {
    // switch (mode) {
    //   case 'js':
    //   case 'javascript':
    //     mode = 'jsx'
    // }
    let syntax = CodeMirror.findModeByName(mode);
    if (syntax == null) syntax = CodeMirror.findModeByName('Plain Text');
    return syntax;
  }

  _.forEach(codeBlocks, block => {
    var syntax = parseMode(block.className.substring(9));

    CodeMirror.requireMode(syntax.mode, () => {
      var value = _.unescape(block.innerHTML);
      block.innerHTML = '';

      // SET CODEMIRROR's THEME
      block.parentNode.className = 'cm-s-dracula CodeMirror';
      // block.parentNode.className = 'cm-s-default CodeMirror';

      CodeMirror.runMode(value, syntax.mime, block, {
        tabSize: 2
      });

      // CodeMirror theme css가 적용된 이후 표시하도록 한다.
      block.style.visibility = 'visible';
    });
  });
});
