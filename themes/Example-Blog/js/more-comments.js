(function($) {
  var button = ".loadmore-comments";
  var action_comments = "loadmore_comments";
  var comment_list = ".comments__list";

  $(document).on("click", button, function() {
    var button = $(this);
    cpage--;

    $.ajax({
      url: wp_params.ajaxurl,
      data: {
        action: action_comments,
        post_id: parent_post_id,
        cpage: cpage
      },
      type: "POST",
      beforeSend: function(xhr) {
        $(button).text("Loading..."); // preloader here
      },
      success: function(data) {
        if (data) {
          $(button).text("More comments");
          $(comment_list).append(data);
          var class_ajax = ".ajax" + cpage;
          $(comment_list)
            .find(class_ajax)
            .hide()
            .fadeIn(500);

          if (cpage == 1) {
            $(button).remove();
          }
        } else {
          $(button).remove();
        }
      }
    });
    return false;
  });
})(jQuery);
