function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var test_users_ids = [4779894, 1571190, 180005, 22351,
                      356509, 45769, 216966, 1279340,
                      495282, 8358077, 15705981, 39060];

var test_opp_ids = [1070976, 4693705, 109168, 470138, 77478, 33751109,
                    52834966, 1658802, 605413, 106281, 7295, 463519];

var gl_users = [];
function getSelectablePictures(users_ids) {
    users_ids = test_users_ids;
    VK.api("getProfiles", {uids:users_ids.toString(), fields:"uid, photo, photo_medium, photo_big, photo_medium_rec", test_mode:1}, function(data) {
        if (data.response === undefined) {
            return;
        }
        gl_users = data.response;
        var ul = document.getElementById("selectable_ul");
        for (var i = 0; i < 12; i++) {
            ul.children[i].innerHTML = "<img id=\"" + gl_users[i].uid+  "\" src=\"" + gl_users[i].photo_medium_rec + "\"/>";
        }
        $("ul.thumb li").click(function() {
            var img = $(this).find('img');
            for (var i = 0; i < 12; i++) {
                if (gl_users[i].uid == img[0].id) {
                    var selected = document.getElementById("img_selected");
                    selected.src = gl_users[i].photo_big;
                    break;
                }
            }
        });
        $("ul.thumb li").hover(function() {
            $(this).css({'z-index' : '10'});
            var img = $(this).find('img');
            var newImg = new Image();
            for (var i = 0; i < 12; i++) {
                if (gl_users[i].uid == img[0].id) {
                    newImg.src = gl_users[i].photo_big;
                    img[0].src = newImg.src;
                    break;
                }
            }
            /*Add a higher z-index value so this image stays on top*/
            img.addClass("hover").stop()/* Add class of "hover", then stop animation queue buildup*/
                .animate({
                    marginTop: '-90px', /* The next 4 lines will vertically align this image */
                    marginLeft: '-110px',
                    marginRight: '110px',
                    top: '50%',
                    left: '50%',
                    width: newImg.width, /* Set new width */
                    height: newImg.height, /* Set new height */
                    padding: '5px'
                }, 200);
            /* this value of "200" is the speed of how fast/slow this hover animates */

        }, function() {
            $(this).css({'z-index' : '0'});
            /* Set z-index back to 0 */
            var img = $(this).find('img');
            for (var i = 0; i < 12; i++) {
                if (gl_users[i].uid == img[0].id) {
                    img[0].src = gl_users[i].photo_medium_rec;
                    break;
                }
            }
            img.removeClass("hover").stop()/* Remove the "hover" class , then stop animation queue buildup*/
                .animate({
                    marginTop: '0', /* Set alignment back to default */
                    marginLeft: '0',
                    top: '0',
                    left: '0',
                    width: '100px', /* Set width back to default */
                    height: '100px', /* Set height back to default */
                    padding: '5px'
                }, 400);
        });
    });
}

function getOpponentsPictures(users_ids) {
    users_ids = test_opp_ids;
    VK.api("getProfiles", {uids:users_ids.toString(), fields:"uid, photo, photo_medium, photo_big, photo_medium_rec", test_mode:1}, function(data) {
        if (data.response === undefined) {
            return;
        }
        var users = data.response;
        var table = document.getElementById("opponents_table");
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 6; j++) {
                table.rows[i].cells[j].innerHTML = "<img class=\"displayed\" id=\"" + users[i*6+j].uid.toString() + "\" src=\"" + users[i*6 + j].photo + "\"/>";
            }
        }
    });
}

