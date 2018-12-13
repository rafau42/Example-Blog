(function($) {
  $.fn.validate = function() {
    if ($(this).val().length < 3) {
      $(this).addClass("error");
      return false;
    } else {
      $(this).removeClass("error");
      return true;
    }
  };

  $.fn.validateEmail = function() {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      emailToValidate = $(this).val();
    if (!emailReg.test(emailToValidate) || emailToValidate == "") {
      $(this).addClass("error");
      return false;
    } else {
      $(this).removeClass("error");
      return true;
    }
  };
})(jQuery);
