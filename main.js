(function() {
  var Mandrill, sendMail, trackGoal;

  trackGoal = function(yandexGoal) {
    var e;
    if (yandexGoal) {
      try {
        return yaCounter24179341.reachGoal(yandexGoal);
      } catch (_error) {
        e = _error;
      }
    }
  };

  $("#clients a").each(function() {
    var a, url;
    a = $(this);
    url = "images/clients/" + (a.data('client')) + ".png";
    a.append("<img src='" + url + "'>");
    return a.attr("data-client", null);
  });

  $("#reviews ul li").each(function() {
    var li, logoUrl, photoUrl;
    li = $(this);
    photoUrl = "images/reviews/" + (li.data('client')) + "-photo.jpg";
    logoUrl = "images/reviews/" + (li.data('client')) + "-logo.png";
    li.css("background-image", "url(" + photoUrl + ")");
    return li.find(".person").css("background-image", "url(" + logoUrl + ")");
  });

  $("[href='#order-presentation']").click(function() {
    var button;
    $("#order").addClass("visible");
    button = $(this).data("name");
    $("#order form h3").text($(this).text());
    $("#order [type=submit]").attr("data-name", button).data("name", button).data("event", $(this).data("event"));
    if ($(this).data("event")) {
      trackGoal("open-" + $(this).data("event"));
    }
    return false;
  });

  $("[href='#order-call']").click(function() {
    var button, left, scrollDelta, top, width_2;
    $("#callme").addClass("visible");
    top = $(this).offset().top + $(this).height() + 35 - window.scrollY;
    left = $(this).offset().left + Math.ceil($(this).width() / 2);
    width_2 = Math.ceil($("#callme .inner").width() / 2);
    left = left - width_2;
    if (left + 2 * width_2 > $(window).width() - 36) {
      left = $(window).width() - width_2 * 2 - 36;
    }
    $("#callme .inner").css({
      top: top,
      left: left
    });
    scrollDelta = $(window).height() - top - $("#callme .inner").height() - 12 - 35;
    if (/iPad/i.test(navigator.userAgent)) {
      scrollDelta = scrollDelta - 350;
    }
    if (scrollDelta < 0) {
      $("html, body").animate({
        scrollTop: window.scrollY - scrollDelta
      }, 400);
      $("#callme .inner").animate({
        top: top + scrollDelta
      }, 400);
    }
    button = $(this).data("name");
    $("#callme [type=submit]").attr("data-name", button).data("name", button).data("event", $(this).data("event"));
    if ($(this).data("event")) {
      trackGoal("open-" + $(this).data("event"));
    }
    return false;
  });

  $("#callme .close, #callme .close-popup, #order .close, #order .close-popup").click(function() {
    var popup;
    popup = $(this).parents("#callme, #order");
    popup.removeClass("visible");
    popup.find("form").removeClass("submited").removeClass("submiting");
    popup.find("form")[0].reset();
    return false;
  });

  $("#header nav a").click(function() {
    var duration, scrollTop;
    scrollTop = $($(this).attr("href")).offset().top;
    duration = Math.abs(window.scrollY - scrollTop);
    $("html, body").bind("mousewheel DOMMouseScroll", function() {
      return false;
    });
    $("html, body").animate({
      scrollTop: scrollTop
    }, {
      duration: duration,
      complete: function() {
        return $("html, body").unbind("mousewheel DOMMouseScroll");
      }
    });
    return false;
  });

  Mandrill = new mandrill.Mandrill("_bFg4pRmNF1b0Jt3IN2K-Q");

  sendMail = function(_arg, complete) {
    var button, email, has_structure, message, name, params, phone, reason, type, welcome_params, when_;
    name = _arg.name, type = _arg.type, reason = _arg.reason, has_structure = _arg.has_structure, when_ = _arg.when_, phone = _arg.phone, email = _arg.email, message = _arg.message, button = _arg.button;
    params = {
      template_name: "robot-rocketslides-email",
      template_content: [
        {
          name: "type",
          content: type
        }, {
          name: "reason",
          content: reason
        }, {
          name: "has_structure",
          content: "has_structure"
        }, {
          name: "when",
          content: when_
        }, {
          name: "name",
          content: name
        }, {
          name: "phone",
          content: phone
        }, {
          name: "email",
          content: email
        }, {
          name: "message",
          content: message
        }, {
          name: "button",
          content: button
        }, {
          name: "type",
          content: $.url().param("type")
        }, {
          name: "source",
          content: $.url().param("source")
        }, {
          name: "block",
          content: $.url().param("block")
        }, {
          name: "pos",
          content: $.url().param("pos")
        }, {
          name: "key",
          content: $.url().param("key")
        }, {
          name: "campaign",
          content: $.url().param("campaign")
        }, {
          name: "ad",
          content: $.url().param("ad")
        }, {
          name: "phrase",
          content: $.url().param("phrase")
        }, {
          name: "utm_source",
          content: $.url().param("utm_source")
        }, {
          name: "utm_medium",
          content: $.url().param("utm_medium")
        }, {
          name: "utm_term",
          content: $.url().param("utm_term")
        }, {
          name: "utm_content",
          content: $.url().param("utm_content")
        }, {
          name: "utm_campaign",
          content: $.url().param("utm_campaign")
        }
      ],
      message: {
        to: [
          {
            email: "rocketslides@robot.zapier.com"
          }, {
            email: "launch@rocketslides.ru"
          }, {
            email: "vadmikhalyov+rngvlkjorugnojiw2me4@boards.trello.com"
          }
        ]
      }
    };
    welcome_params = {
      template_name: "welcome",
      template_content: [
        {
          name: "name",
          content: name
        }
      ],
      message: {
        to: [
          {
            email: email
          }
        ]
      }
    };
    return Mandrill.messages.sendTemplate(params, function() {
      if ((email || '').length) {
        Mandrill.messages.sendTemplate(welcome_params, function() {
          if (complete) {
            return complete();
          }
        });
      }
      return {
        "else": complete ? complete() : void 0
      };
    });
  };

  $("#id_has_phone_1").change(function() {
    return $('#id_phone_1').css({
      display: $(this).is(':checked') ? 'inline-block' : 'none'
    });
  });

  $("#id_has_phone_2").change(function() {
    return $('#id_phone_2').css({
      display: $(this).is(':checked') ? 'inline-block' : 'none'
    });
  });

  $("form").submit(function() {
    var button, email, has_structure, message, name, phone, reason, type, when_;
    name = $(this).find("[name='name']").val() || "";
    phone = $(this).find("[name='phone']").val() || "";
    email = $(this).find("[name='email']").val() || "";
    message = $(this).find("[name='message']").val() || "";
    button = $(this).find("[data-name]").data("name") || "";
    when_ = $(this).find("[name='when']").val() || "";
    reason = $(this).find("[name='reason']").val() || "";
    type = $(this).find("[name='type']").val() || "";
    has_structure = $(this).find("[name='has_structure']").val() || "";
    $(this).addClass("submiting");
    sendMail({
      name: name,
      phone: phone,
      email: email,
      message: message,
      button: button,
      when_: when_,
      reason: reason,
      type: type,
      has_structure: has_structure
    }, (function(_this) {
      return function() {
        $(_this).removeClass("submiting").addClass("submited");
        return trackGoal($(_this).find("[type='submit']").data("event"));
      };
    })(this));
    return false;
  });

  $(window).scroll($.throttle(100, function() {
    var found;
    found = null;
    $("#header nav a").each(function() {
      if (window.scrollY > $($(this).attr("href")).offset().top - 100) {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        return found = true;
      }
    });
    if (!found) {
      $("#header nav a").removeClass("active");
    }
    if (window.scrollY > 100) {
      return $("#header").addClass("small");
    } else {
      return $("#header").removeClass("small");
    }
  }));

  $("input").each(function() {
    if (this.getAttribute("required")) {
      this.oninvalid = function(e) {
        e.target.setCustomValidity("");
        if (!e.target.validity.valid) {
          return e.target.setCustomValidity("Обязательное поле");
        }
      };
      return this.oninput = function(e) {
        return e.target.setCustomValidity("");
      };
    }
  });

}).call(this);
