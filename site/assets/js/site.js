$(function() {
  $('pre:not(.hljs)').addClass('hljs');
  $(".select-selecter").selecter();

  $('#btn-fullscreen').click(function() {
    if ($.fullscreen.isFullScreen()) {
      $.fullscreen.exit();
    } else {
      $('.canvas-container').fullscreen({
        toggleClass: 'fullscreen'
      });
    }
  });
});