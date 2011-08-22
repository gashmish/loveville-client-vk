var socket = io.connect('192.168.1.131:8000');

var choice_count = 0;
var opps_count = 0;

socket.on('charts', function (data) {
    console.log(data);
});

socket.on('user_stats', function (data) {
    console.log(data);
});

socket.on('room_init', function (data) {
    console.log(data);
});

socket.on('room_entered', function (data) {
    console.log("entered", data);
    updateRoom(data);
});

socket.on('room_update', function (data) {
    console.log("update", data);

    switch (data.user_sex) {
    case "boy":
        updateRoom({ 'boys': [data.user_id], 'girls': [] } );
        break;
    case "girl":
        updateRoom({ 'girls': [data.user_id], 'boys': [] } );
        break;
    }
});

socket.on('room_results', function (data) {
    console.log(data);
});

socket.emit('user_stats', { my: 'data' });
socket.emit('charts', { my: 'data' });

var sex = ['boy', 'girl'];
var current_id = Math.floor(Math.random()*1000);
var current_sex = sex[Math.floor(Math.random()*10)%2];

socket.emit('enter_room', { user_id: current_id, user_sex: current_sex });

function updateRoom(data) {
    var choice = document.getElementById("selectable_ul");
    var opps = document.getElementById("opponents_table");
    var choice_data;
    var opps_data;

    switch (current_sex) {
    case "boy":
        choice_data = data.girls;
        opps_data = data.boys;
        break;
    case "girl":
        choice_data = data.boys;
        opps_data = data.girls;
        break;
    }

    for (var i = 0; i < 12 && i < choice_data.length; i++) {
        choice.children[i].innerHTML = choice_data[i];
    }
    choice_count = data.girls.length;

    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 6 && i*6+j < opps_data.length; j++) {
            opps.rows[i].cells[j].innerHTML = opps_data[i*6+j];
        }
    }
    opps_count = data.boys.length;
}
