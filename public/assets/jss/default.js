//Wachusett Redesign Mockup - drinkcaffeine - 4/13/2017
//functions
function setupAlertMarquee() {
	if($("#test-large").css("float") == "left") {
    	var marqueeDuration = 12000;
    }
    else if($("#test-large").css("float") == "none" && $("#test-mobile").css("float") == "left") {
    	var marqueeDuration = 7000;
    }
    else {
    	var marqueeDuration = 5000;
    }
    $('#alert-feed-cont').marquee('destroy').marquee({
		duration: marqueeDuration,
		duplicate: true,
		pauseOnHover: true
    });
}

function columnizeLongLists() {
    $(".yamm-content > .row > div > dl").each(function() {
        var test = $(this).children("dd").length;
        if(parseInt(test)>14)
            $(this).addClass("large-3-column");
        else if(parseInt(test)>5)
            $(this).addClass("large-2-column");
    });
}

function setCloseMenuBtn() {
    $(".close-btn a").click(function(n){
        n.preventDefault; n.stopPropagation();
        $("#navbar").collapse('hide');
    });
}

//init
$(document).ready(function(){
	  $.when($("#alert-feed-cont div").html("<i class='fa fa-circle pull-left'></i><strong>SCROLLING NEWS ALERT</strong>: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent libero turpis, vehicula vel pellentesque sit amet, ultricies a lorem.")
	  .clone().insertAfter("#alert-feed-cont div:last")).done(function(){
		  setupAlertMarquee();
	  });

    setCloseMenuBtn();
    columnizeLongLists();

    $(document).on('click', '.navbar #navbar ul > li  a.nav-item ', function () {
      console.log('click');
      let $li = $(this).closest('li');
      $li.siblings('li').removeClass('open');
      $li.addClass('open');
    });
});
