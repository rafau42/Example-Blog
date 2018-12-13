(function($) {
  var navigation_wrap = $(".navigation-wrap");
  var navigation = $("#main-navigation");
  navigation.before('<button class="navigation__toggle" type="button" aria-label="Toggle Menu" aria-expanded="false" aria-controls="main-menu" title="Toggle Menu"><span class="sr-only">Open </span>Menu</button>');
  var navigation_toggle = $(".navigation__toggle");
  navigation_toggle.append(
    '<i class="navigation__toggle-icon navigation__icon fa fa-bars"></i>'
  );
  var navigation_icon = $(".navigation__toggle-icon");
  var navigation_list = $(".navigation__list");
  $("li.menu-item-has-children").addClass("navigation__dropdown-list-item");
  $("li.menu-item-has-children .sub-menu").addClass("navigation__sub-list");
  $("li.menu-item-has-children .sub-menu li").addClass(
    "navigation__sub-list-item"
  );
  $("li.menu-item-has-children > a").replaceWith(
    '<button class = "navigation__sub-toggle" type="button" aria-label="Toggle Sub-Menu" aria-expanded="false" aria-controls="sub-menu" title="Toggle Sub-Menu"><span class="sr-only">Open </span>Categories</button>'
  );
  var navigation_sub_toggle = $(".navigation__sub-toggle");
  navigation_sub_toggle.append(
    '<i class = "navigation__sub-toggle-icon navigation__icon fa fa-bars"></i>'
  );
  var navigation_sub_icon = $(".navigation__sub-toggle-icon");
  var navigation_sub_list = $(".navigation__sub-list");
  toggleNav(navigation_toggle, navigation_list, navigation_icon);
  toggleNav(navigation_sub_toggle, navigation_sub_list, navigation_sub_icon);
  fixedNav();

  function toggleNav(toggle, list, icon) {
    toggle.click(function() {
      toggle.toggleAttrVal("aria-expanded", "true", "false");
      toggle.find(".sr-only").toggleText("Close ", "Open ");
      list.slideToggle(200);
      icon.toggleClass("fa-window-close", "fa-bars");
    });
  }

  function fixedNav() {
    navigation_wrap.waypoint(
      function(direction) {
        if (direction == "down") {
          navigation_wrap.addClass("sticky");
        } else {
          navigation_wrap.removeClass("sticky");
        }
      },
      {
        offset: "-250px"
      }
    );
  }
})(jQuery);
