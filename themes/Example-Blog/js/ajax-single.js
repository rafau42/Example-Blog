(function($) {
  var container_string = ".main";
  var single_link_string = ".js-single-link";
  var action_single = "single";
  singleAjax();

  function singleAjax() {
    $(document).on("click", single_link_string, function(event) {
      event.preventDefault();
      var post_id = $(this).data("id");
      var state = {};
      var window_url = $(this).attr("href");
      var data = {
        action: action_single,
        post_id: post_id
      };

      $.ajax({
        type: "POST",
        url: wp_params.ajaxurl,
        context: this,
        data: data,

        success: function(data) {
          $(container_string)
            .html(data)
            .find(".main__container")
            .hide()
            .fadeIn(500);
          history.pushState(state, "", window_url);
        }
      });
    });
  }
})(jQuery);
