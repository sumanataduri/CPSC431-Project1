var main = function() {
    "use strict";

    function myfunction() {
        $.get("http://localhost:3000/reddit", function(getData) {
            getData.forEach(function(reddit) {

                var postsList = "<div class ='postContent'>" + "<div class = 'votes'>" + "<img class='voteUpButton' src='image/up.png'>" + "<br>" + "<strong id =" + reddit.id + " class='votesNum'>" + "</strong>" + "<br>" + "<img class='voteDownButton' src='image/down.png'>" + "</div>" + "<div class ='Content-List'>" + "<p>" + "<a href=" + JSON.stringify(reddit.main_link) + ">" + reddit.link_title + "</a>" + "</p>" + "</div>";

                $(postsList).appendTo('div.postsContainer');
                $("#" + reddit.id + ".votesNum").text(reddit.likes);
                $("#postform")[0].reset(); //For posting area
            });
        });
    }
    //Start- for postform validation
    myfunction();
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    $("#postform").validate({
        rules: {
            field: {
                required: true,
                url: true
            }
        }
    });
    var form = $("#postform");
    form.validate();//End- post form validation
    //Start- JQuery code for post fields
    $("#postbutton").click(function(element) {
        var check = $("#checkbox").is(':checked');
        if (check === true) {
            if ($("#input1").val() === "" || $("#input2").val() == "" || $("#input3").val() == "") {
                element.preventDefault();
                setTimeout(fade_out, 5000);
                $("#spanbutton").css({
                    "visibility": "visible",
                    "display": "inline"
                }).text("Enter input");

                function fade_out() {
                    $("#spanbutton").fadeOut().empty();
                }
            } else {
                if (form.valid() === true) {

                    $("#spanbutton").css({
                        "visibility": "visible"
                    }).text("");
                    $.post("http://localhost:3000/reddit", {
                        "link_title": $("#input1").val(),
                        "main_link": $("#input2").val(),
                        "image_link": $("#input3").val(),
                        "likes": 0,
                        "post": "submitted"
                    }, function() {
                        myfunction();

                    });

                }

            }
        } else {
            element.preventDefault();
            setTimeout(fade_out, 5000);

            function fade_out() {
                $("#spanbutton").fadeOut().empty();
            }
            $("#spanbutton").css({
                "visibility": "visible",
                "display": "inline"
            }).text("Log in to post");
        }
    });
    //End-code for post fields
};

$(document).ready(main);