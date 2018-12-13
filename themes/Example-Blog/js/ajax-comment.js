(function($) {
  var reply_link = ".comment__reply-link";
  var cancel_reply_link = "#cancel-comment-reply-link";
  var reply = undefined;
  var button = "#submit";
  var respond = "#respond";
  var comment_list = ".comments__list";
  var cancelreplylink = "#cancel-comment-reply-link";
  isReply();
  submitComment();

  function isReply() {
    $(document).on("click", reply_link, function(event) {
      event.preventDefault();
      $(respond).addClass("comment-respond--reply");
    });

    $(document).on("click", cancel_reply_link, function(event) {
      event.preventDefault();
      $(respond).removeClass("comment-respond--reply");
    });
  }

  function submitComment() {
    $(document).on("submit", "#commentform", function(event) {
      event.preventDefault();
      validateFields();
      if (
        !$(button).hasClass("loading") &&
        !$("#author").hasClass("error") &&
        !$("#email").hasClass("error") &&
        !$("#comment").hasClass("error")
      ) {
        $.ajax({
          type: "POST",
          url: wp_params.ajaxurl,
          data: $(this).serialize() + "&action=ajaxcomments",
          beforeSend: function(xhr) {
            $(button).addClass("loading");
            $(button).val("Loading...");
          },
          error: function(request, status, error) {
            if (status == 500) {
              alert("Error while adding comment");
            } else if (status == "timeout") {
              alert("Error: Server doesn't respond.");
            } else {
              var wpErrorHtml = request.responseText.split("<p>"),
                wpErrorStr = wpErrorHtml[1].split("</p>");
              alert(wpErrorStr[0]);
            }
          },
          success: function(addedCommentHTML) {
            if ($(respond).hasClass("comment-respond--reply")) {
              $(respond).before(addedCommentHTML);
            } else {
              $(respond).before(addedCommentHTML);
              $(".comment:last")
                .hide()
                .fadeIn(1000);
            }
            $("#comment").val("");
          },
          complete: function() {
            $(button).removeClass("loading");
            $(button).val("Post Comment");
          }
        });
      }
      return false;
    });
  }

  function validateFields() {
    if ($("#author").length) {
      $("#author").validate();
    }
    if ($("#email").length) {
      $("#email").validateEmail();
    }
    $("#comment").validate();
  }
})(jQuery);
