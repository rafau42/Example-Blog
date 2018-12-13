(function($) {
    $.fn.toggleAttrVal = function(attr, val1, val2) {
      var test = $(this).attr(attr);
      if (test === val1) {
        $(this).attr(attr, val2);
        return this;
      }
      if (test === val2) {
        $(this).attr(attr, val1);
        return this;
      }
      // default to val1 if neither
      $(this).attr(attr, val1);
      return this;
    };

    $.fn.toggleText = function(t1, t2){
      if (this.text() == t1) this.text(t2);
      else                   this.text(t1);
      return this;
    };
  })(jQuery);