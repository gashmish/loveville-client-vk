function setSexStyle(sex) {
    if (sex == 1) {
        document.getElementById("start_menu").setAttribute("class", "start_menu_girls");
        document.getElementById("start_button").setAttribute("class", "button_girl");
    }
    else {
        document.getElementById("start_menu").setAttribute("class", "start_menu_boys");
        document.getElementById("start_button").setAttribute("class", "button_boy");
    }
    localStorage.setItem('sex', sex);
    $('#start_button a').hover(function() {
            $(this).stop().animate({'opacity' : '0'}, 500);
        }, function() {
            $(this).stop().animate({'opacity' : '1'}, 500);
        });
}