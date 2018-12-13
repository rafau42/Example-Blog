(function($) {
  var navigation_link = ".navigation__link";
  var single_link = ".js-single-link";
  var target = ".main";
  siteScroll();

  function siteScroll() {
    $(document).on("click", navigation_link, function() {
      scrollToContent();
    });

    $(document).on("click", single_link, function() {
      scrollToContent();
    });
  }

  function scrollToContent() {
    $("html,body").animate(
      {
        scrollTop: $(target).offset().top
      },
      1500
    );
  }
})(jQuery);
