(function($) {
  var container = $(".main");
  /* actions */
  var action_blog = "blog";
  var action_sport = "category_sport";
  var action_food = "category_food";
  var action_books = "category_books";
  var action_uncategorized = "category_uncategorized";
  var action_sample_page = "sample_page";
  var action_gallery = "gallery";
  var action_contact = "contact";
  /* links */
  var link_blog = $(".menu-item-53 > .navigation__link");
  var link_category_sport = $(".menu-item-19 > .navigation__link");
  var link_category_food = $(".menu-item-57 > .navigation__link");
  var link_category_books = $(".menu-item-58 > .navigation__link");
  var link_category_uncategorized = $(".menu-item-18 > .navigation__link");
  var link_gallery_sidebar = $(".gallery-box__link");
  var link_gallery = $(".menu-item-86 > .navigation__link");
  var link_sample_page = $(".menu-item-56 > .navigation__link");
  var link_contact = $(".menu-item-54 > .navigation__link");
  eventsPage();
  
  function eventsPage() {
    ajaxPage(link_blog, action_blog);
    ajaxPage(link_category_sport, action_sport);
    ajaxPage(link_category_food, action_food);
    ajaxPage(link_category_books, action_books);
    ajaxPage(link_category_uncategorized, action_uncategorized);
    ajaxPage(link_sample_page, action_sample_page);
    ajaxPage(link_gallery, action_gallery);
    ajaxPage(link_gallery_sidebar, action_gallery);
    ajaxPage(link_contact, action_contact);
    
  }

  function ajaxPage(link, wp_action) {
    link.click(function(event) {
      event.preventDefault();
      var state = {};
      var window_url = $(this).attr("href");

      var data = {
        action: wp_action,
        page: 1
      };

      $.ajax({
        url: wp_params.ajaxurl,
        data: data,
        type: "POST",
        beforeSend: function(xhr) {},

        success: function(data) {
          if (data) {
            container
              .html(data)
              .find(".main__container")
              .hide()
              .fadeIn(500);
            wp_params.current_page = 1;
            history.pushState(state, "", window_url);
          }
        }
      });
    });
  }
})(jQuery);
