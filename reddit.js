var main = function() {
    "use strict";

    function myfunction() {
        $.get("http://localhost:3000/reddit", function(getData) {
            getData.forEach(function(reddit) {

                var postsList = "<div class ='postContent'>" + "<div class = 'votes'>" + "<img class='voteUpButton' src='image/up.png'>" + "<br>" + "<strong id =" + reddit.id + " class='votesNum'>" + "</strong>" + "<br>" + "<img class='voteDownButton' src='image/down.png'>" + "</div>" + "<div class ='Content-List'>" + "<p>" + "<a href=" + JSON.stringify(reddit.main_link) + ">" + reddit.link_title + "</a>" + "</p>" + "</div>";

                $(postsList).appendTo('div.postsContainer');
                $("#" + reddit.id + "").text(reddit.likes);
            });
        });
    }
    myfunction();
    $("#postbutton").click(function(element) {
        var check = $("#checkbox").is(':checked');
        if (check === true) {
            if ($("#input1").val() === "" || $("#input2").val() == "" || $("#input3").val() == "") {
                element.preventDefault();
                $("#spanbutton").css({
                    "visibility": "visible"
                }).text("Enter input");
            } else {
                alert("going to post")
                //$("#spanbutton").css({"visibility": "visible"}).text("");
                $.post("http://localhost:3000/reddit", {
                    "link_title": $("#input1").val(),
                    "main_link": $("#input2").val(),
                    "image_link": $("#input3").val(),
                    "likes": 0,
                    "post": "submitted"
                },function(){
                    alert("success");
                });
           }
        } else {
            element.preventDefault();
            $("#spanbutton").css({
                "visibility": "visible"
            }).text("Log in to post");
        }
    });
}

$(document).ready(main);