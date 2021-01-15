console.log("jq", $);

(function () {
  $.ajax({
    url: "/tickerAjax.json",
    method: "GET",
    success: function (response) {
      var myHtml = "";
      for (var i = 0; i < response.length; i++) {
        var anchor =
          "<a class='anchors' href=" +
          response[i].url +
          "> " +
          response[i].text +
          "</a>";
        myHtml += anchor;
      }

      $(".box").html(myHtml);
    },
    error: function (err) {
      console.log("err: ", err);
    },
  });

  ticker("ticker1", -1);

  function ticker(id, step) {
    var box = $(".box");
    var left = box.offset().left;
    var anim;

    $(".box")[0].addEventListener("mouseover", function (e) {
      if (e.target.tagName == "A") {
        cancelAnimationFrame(anim);
        e.preventDefault();
      }
    });
    $(".box")[0].addEventListener("mouseout", function (e) {
      if (e.target.tagName == "A") {
        moveHeadlines();
      }
    });
    moveHeadlines();
    function moveHeadlines() {
      left += step;
      console.log(left, $(".anchors").eq(0).width());
      if (step < 0 && left < -$(".anchors").eq(0).outerWidth()) {
        left += $(".anchors").eq(0).outerWidth();

        box.append($(".anchors").eq(0));
      }
      box.css({
        left: left + "px",
      });
      anim = requestAnimationFrame(moveHeadlines);
    }
  }
})();
