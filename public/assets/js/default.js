//Wachusett 2022
//functions
function setupAlertMarquee() {
    var marqueeDuration = 12000;
    if ($("#test-large").css("float") == "left") {
        marqueeDuration = 12000;
    } else if ($("#test-large").css("float") == "none" && $("#test-mobile").css("float") == "left") {
        marqueeDuration = 10000;
    } else {
        marqueeDuration = 8000;
    }
    $('#alert-feed-cont').marquee('destroy').marquee({
        duration: marqueeDuration,
        duplicate: true,
        pauseOnHover: true
    });
}

function searchInit() {
    $(".search-btn").click(function (n) {
        $(this).remove();
        n.preventDefault();n.stopPropagation();
        $("#desktop-search").fadeIn();
        $("#desktop-search .search-input").focus();
    });
    $('.search-input').keydown(function (e) {
        e.stopPropagation();
        v = $(this).val();
        if (e.keyCode == 13) {
            e.preventDefault();
            doSearch(v);
        }
    });
    $('.start-search-btn').click(function (e) {
        v = $(this).closest('.input-group').children('.search-input').val();
        e.preventDefault();
        doSearch(v);
    });
}

function doSearch(v) {
    if (v != "" && v != "Search") {
        v = v.replace('/', '');
        v = v.replace('//', '');
        var str = "/Search.aspx?searchtext=" + v;
        window.location = str;
    }
}

function setNavZeroOpacity() {
    $(".nav-item").css("opacity", 0);
}

function fadeInLinks(items) {
    var e = new TimelineMax({
        id: "links"
    });
    return e.staggerTo(items, 0.25, {
        opacity: 1,
        x: 5,
        ease: Expo.easeIn
    }, 0.05);
}

function setNavCheck() {
    $(".dropdown > .nav-link").click(function () {
        if (!$(this).parent().hasClass("show")) {
            setNavZeroOpacity();
            $(this).parent().find(".light-blue-border-left").each(function () {
                fadeInLinks($(this).find(".nav-item"));
            });
        } else {
            setNavZeroOpacity();
        }
    });
}

function setHomepageHeight() {
    $("#VideoRowRight").css("max-height", "1px");
    var vidheight = $("#FeaturedVideo").height();    
    if ($("#test-large").css("float") == "left") {
        $("#VideoRowRight").css("max-height", vidheight);
    }
    else {
        $("#VideoRowRight").css("max-height", "none");
    }
}

function setBlogLinkTarget() {
    $(".nav-item a[href$='/The-Mountain/About-Wachusett/The-Wachusett-Wire-Blog.aspx']").attr("target","_blank");
    $(".subnav-container a[href$='/The-Mountain/About-Wachusett/The-Wachusett-Wire-Blog.aspx']").attr("target","_blank");
    $(".nav-item a[href$='/Ski-Shop/Shop-From-Home.aspx']").attr("target","_blank");
    $(".subnav-container a[href$='/Ski-Shop/Shop-From-Home.aspx']").attr("target","_blank");
    $(".nav-item a[href$='/Ski-Shop/Service-Dept.aspx']").attr("target","_blank");
    $(".subnav-container a[href$='/Ski-Shop/Service-Dept.aspx']").attr("target","_blank");
    $(".nav-item a[href$='/Ski-Shop/Demo-Equipment.aspx']").attr("target","_blank");
    $(".subnav-container a[href$='/Ski-Shop/Demo-Equipment.aspx']").attr("target","_blank");
}

//init
$(document).ready(function () {

    searchInit();
    setNavZeroOpacity();
    setNavCheck();
    setBlogLinkTarget();
    if ($("body").hasClass("homepage")) {
        setHomepageHeight();
    }
});

$(window).resize(function(){
    if ($("body").hasClass("homepage")) {
        setHomepageHeight();
    }
});
