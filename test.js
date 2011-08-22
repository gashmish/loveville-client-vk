
get_current_id = function(cb) {
    VK.api('getVariable',{
	key: 1280,
	test_mode: 1
    }, function(data) {
	console.log(data);
    });
}

var socket = io.connect('192.168.1.131:8000');

socket.on('charts', function (data) {
    console.log(data);
});

socket.on('user_stats', function (data) {
    console.log(data);
});

socket.on('room_init', function (data) {
    console.log(data);
});

socket.on('room_results', function (data) {
    console.log(data);
});

socket.emit('user_stats', { my: 'data' });
socket.emit('charts', { my: 'data' });

socket.emit('enter_room', { user_id: '1', user_sex: 'boy' });
socket.emit('enter_room', { user_id: '2', user_sex: 'boy' });
socket.emit('enter_room', { user_id: '3', user_sex: 'girl' });
socket.emit('enter_room', { user_id: '4', user_sex: 'girl' });

socket.emit('enter_room', { user_id: '5', user_sex: 'girl' });
