(function($) {
  /* containers */ 
  var container_main_string = ".main__container";
  /* actions */
  var loadmore_blog = "loadmore_blog";
  var loadmore_category_sport = "loadmore_category_sport";
  var loadmore_category_food = "loadmore_category_food";
  var loadmore_category_books = "loadmore_category_books";
  var loadmore_category_uncategorized = "loadmore_category_uncategorized";
  var loadmore_gallery = "loadmore_gallery";
  /* variables - ajax content */
  var button_blog_string = ".load-more-blog";
  var button_category_sport_string = ".load-more-category-sport";
  var button_category_food_string = ".load-more-category-food";
  var button_category_books_string = ".load-more-category-books";
  var button_category_uncategorized_string =
    ".load-more-category-uncategorized";
  var button_gallery_string = ".load-more-gallery";
  eventsAjaxContent();

  function eventsAjaxContent() {
    morePostsAjaxContent(
      button_blog_string,
      loadmore_blog
    );
    morePostsAjaxContent(
      button_category_sport_string,
      loadmore_category_sport
    );
    morePostsAjaxContent(
      button_category_food_string,
      loadmore_category_food
    );
    morePostsAjaxContent(
      button_category_books_string,
      loadmore_category_books
    );
    morePostsAjaxContent(
      button_category_uncategorized_string,
      loadmore_category_uncategorized
    );
    morePostsAjaxContent(
      button_gallery_string,
      loadmore_gallery
    );
  }

  function morePostsAjaxContent(button, wp_action) {
    $(document).on("click", button, function() {
      var data = {
        action: wp_action,
        page: wp_params.current_page
      };

      $.ajax({
        url: wp_params.ajaxurl,
        data: data,
        type: "POST",
        beforeSend: function(xhr) {
          $(button).text("Loading...");
        },
        success: function(data) {
          if (data) {
            $(button).text("More posts");
            $(container_main_string).append(data);
            wp_params.current_page++;
            var class_ajax = ".ajax" + wp_params.current_page;
            $(container_main_string)
              .find(class_ajax)
              .hide()
              .fadeIn(1000);

            if (wp_params.current_page == wp_params.max_page)
              $(button).remove();
          } else {
            $(button).remove();
          }
        }
      });
    });
  }
})(jQuery);
