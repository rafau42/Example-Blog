(function($) {
  var button_recent = $("#button-recent");
  var button_popular = $("#button-popular");
  var button_comments = $("#button-comments");
  var target1 = $("#target1");
  var target2 = $("#target2");
  var target3 = $("#target3");

  nextTab(button_recent, target1);
  nextTab(button_popular, target2);
  nextTab(button_comments, target3);
  button_recent.click();

  function nextTab(button, target) {
    button.click(function() {
      $(this)
        .addClass("btn--red-non-hover")
        .removeClass("btn--dark")
        .attr("aria-expanded", "true")
        .find(".sr-state")
        .text("Close");
      $(this)
        .siblings(".btn--aside")
        .removeClass("btn--red-non-hover")
        .addClass("btn--dark")
        .attr("aria-expanded", "false")
        .find(".sr-state")
        .text("Close");
      target.siblings(".box-hidden").hide();
      target.fadeIn(500);
    });
  }
})(jQuery);
