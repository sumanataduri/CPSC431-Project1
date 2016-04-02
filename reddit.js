var main = function() {
    "use strict";
    var totalnumofitems,
        jsondata;

    function myfunction() {
        $.get("http://localhost:3000/reddit", function(getData) {
            $("div.postsContainer").empty();
            getData.forEach(function(reddit) {
                
                var postsList = "<div class ='postContent z-depth-1'>" + "<div class='rank'>" +
                    "<p id='numbering'>" + reddit.id + "</p>" + "</div>" + "<div class = 'votes'>" +
                    "<i class='material-icons thumbup'>thumb_up</i>" + "<br>" + "<strong id =" +
                    reddit.id + " class='votesNum'>" + "</strong>" + "<br>" +
                    "<i class='material-icons thumbdown'>thumb_down</i>" +
                    "</div>" + "<div class='image'>" + "<a href=" + reddit.main_link + ">" +
                    "<img src=" + reddit.image_link +"  class='postimage'>" + "</a>" + "</div>" + "<div class='Content-List'>" +
                    "<a href=" + reddit.main_link + ">" + "<p class='postname'>" +
                    reddit.link_title + "</p>" + "<div class='subtitles'>" + "<p class='username'>By " +
                    reddit.username + "</p>" + "<p class='time'>" + timeSince(new Date(reddit.post_time)) +
                    "</p>" + "<p class='share'> share" + "</p>" + "</div>" + "</a>" + "<div id=" +
                    reddit.id + " class='imageDivLink' ></div>" + "<div id=" + reddit.id +
                    " class='contentDivImg'></div>" + "</div>";

                     $("#postform")[0].reset(); //For posting areas

                $(postsList).appendTo('div.postsContainer');
                $("#" + reddit.id + ".votesNum").text(reddit.likes);                
                if (reddit.image_link != "image/noimage.jpg") {
                    
                    $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                }
                $("#" + reddit.id + ".imageDivLink").on("click", function() {
                    if ($("#" + this.id + ".contentDivImg").css('display') === 'none') {
                        $(".contentDivImg").hide();
                        $("#" + this.id + ".contentDivImg").html("<img id=" + reddit.id + " src=" + JSON.stringify(reddit.image_link) + "  frameborder='0' allowfullscreen></iframe>");
                        $("#" + this.id + ".contentDivImg").css('display', 'block');
                        $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>pause_circle_filled</i>");
                    } else {
                        $("#" + this.id + ".contentDivImg").css('display', 'none');
                        $("#" + reddit.id + ".imageDivLink").html("<i class='material-icons play'>play_circle_filled</i>");
                    }
                });

                
            });

            jsondata = getData;
            totalnumofitems = getData.length;
            pages(totalnumofitems);
        });
        
    }
    $(".button-collapse").sideNav();
        $('.modal-trigger').leanModal();
        $('.tooltipped').tooltip({
           delay: 50
        });
    //Start- hovering action on posts

    $("div").on("mouseover", "div.postContent", function() {
        $(this).addClass("z-depth-2");
    });

    $("div").on("mouseleave", "div.postContent", function() {
        $(this).removeClass("z-depth-2");
    });
    //End- hovering action on posts

    //Start- thumb up/down hovering
    $("div").on("mouseover", "i.material-icons.thumbup ", function() {
        $(this).css("color", "black");
    });
    $("div").on("mouseleave", "i.material-icons.thumbup", function() {
        $(this).css("color", "darkgrey");
    });
    $("div").on("mouseover", "i.material-icons.thumbdown ", function() {
        $(this).css("color", "black");
    });
    $("div").on("mouseleave", "i.material-icons.thumbdown", function() {
        $(this).css("color", "darkgrey");
    });

$("div").on("mouseover", "i.material-icons.play ", function() {
        $(this).css("color", "pink");
    });
    $("div").on("mouseleave", "i.material-icons.play", function() {
        $(this).css("color", "darkgrey");
    });
    myfunction();

    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }
function resizeIframe(obj){
    obj.style.height=obj.contentWindow.document.body.scrollHeight+ 'px';
}

    //Start- for postform validation

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
  
    
    $("a.postnews").on("click", function() {
        var form = $("#postform");
        form.validate(); //End- post form validation
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
                } /*else if ($("#input1").val() !== "" || $("#input2").val() !== "" || $("#input3").val() !== "") {

                    jsondata.forEach(function(reddit1) {
                        if ((reddit1.link_title === $("#input1").val())) {
                            alert(JSON.stringify(reddit1.main_link)+"\\\\   "+$("#input2").val() );
                            console.log(reddit1.main_link);
                            element.preventDefault();
                            setTimeout(fade_out2, 5000);
                            $("#spanbutton").css({
                        "visibility": "visible",
                        "display": "inline"
                        }).text("Post Title already exists in the site");

                            function fade_out2() {
                        $("#spanbutton").fadeOut().empty();
                        $("#postform")[0].reset();
                            }
                        }
                        else if(JSON.stringify(reddit1.main_link) === $("#input2").val()){
                            alert("in second if");
                            element.preventDefault();
                            setTimeout(fade_out4, 5000);
                            $("#spanbutton").css({
                        "visibility": "visible",
                        "display": "inline"
                    }).text("URL already exists in the site");
                            
                            function fade_out4() {
                        $("#spanbutton").fadeOut().empty();
                        $("#postform")[0].reset();
                            }
                        }
                        else if($("#input3").val()!==undefined){
                            if(JSON.stringify(reddit1.image_link) === $("#input3").val()){
                            alert($("#input3").val());
                            element.preventDefault();
                            setTimeout(fade_out3, 5000);
                            $("#spanbutton").css({
                        "visibility": "visible",
                        "display": "inline"
                    }).text("Image/Video URL already exists in the site");
                            function fade_out3() {
                        $("#spanbutton").fadeOut().empty();
                        $("#postform")[0].reset();
                            }
                        }
                        }

                    });
                   
              } */
              else
              {
                if (form.valid() === true) {
                        var date = new Date();
                        $("#spanbutton").css({
                            "visibility": "visible"
                        }).text("");
                        if ($("#input3").val() === undefined) {
                            alert("posting only 2 fields");
                            $.post("http://localhost:3000/reddit", {
                                "link_title": $("#input1").val(),
                                "main_link": $("#input2").val(),
                                "image_link": "image/noimage.jpg",
                                "likes": 0,
                                "post_time": date
                            }, function() {
                                myfunction();

                            });
                        } else {
                            alert("posting all fields")
                            $.post("http://localhost:3000/reddit", {
                                "link_title": $("#input1").val(),
                                "main_link": $("#input2").val(),
                                "image_link": $("#input3").val(),
                                "likes": 0,
                                "post_time": date
                            }, function() {
                                myfunction();

                            });
                        }
                    }
              }
            } else {
                element.preventDefault();
                setTimeout(fade_out1, 5000);

                function fade_out1() {
                    $("#spanbutton").fadeOut().empty();
                }
                $("#spanbutton").css({
                    "visibility": "visible",
                    "display": "inline"
                }).text("Log in to post");
            }
        });
    });


    //End-code for post fields

    $("div.addimage").on("click", function() {
        $("div.addimage").replaceWith("<div id='imageinput'><label id='imageurl' for='input3'>Enter image URL...</label><input class='input-field validate' name='input3' type='url' id='input3'></div>");
    });

    //start- image display
    // $("div.imageDivLink").on("click",function(){
    //   alert(this.id);

    //  $("#"+this.id+".contentDivImg").toggle();
    /* if($("#"+this.id+".contentDivImg").css('display')==="block "){
            $("#"+this.id+".contentDivImg").css('display','none !important');
            
            $("#" + this.id +".imageDivLink").html("<img src='http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/3d-transparent-glass-icons-signs/089099-3d-transparent-glass-icon-signs-first-aid1.png' width='20' hide         ight='20'>");
         }
         else{
            $("#" + this.id +".contentDivImg").css('display','block !important');
            $("#" +this.id +".imageDivLink").html("<img src='http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/3d-transparent-glass-icons-media/001447-3d-transparent-glass-icon-media-a-media36-delete.png' width='20' height='20'>");

            alert(id);
        }
    */

    //   });
    //End-Image display

    //Start- code for Pagination
    function pages(totalnumofitems) {
        var numofitems_page = 10,
            numofpages = Math.ceil(totalnumofitems / numofitems_page),
            pagenumbers;
        //  $("div.postsContainer").children().hide();
            $("ul.pagination").empty();
        for (var i = 1; i <= numofpages; i++) {
            pagenumbers = "<li class='waves-effect'>" + i + "</li>";
            $(pagenumbers).appendTo("ul.pagination");
        }
        $("div.postsContainer").children().hide();
        $("div.postsContainer div:nth-child(-n+10)").slice(0).show();
        $("ul.pagination").on("click", "li", function() {
            var page = $(this).text(),
                x = page * 10,
                y = (page - 1) * 10;
            $("li").removeClass("pages");
            $(this).addClass("pages");
            $("div.postsContainer").children().hide();
            $("div.postsContainer div.postContent").slice(y, x).show();
        });
    }
    //End of Pagination

};

$(document).ready(main);