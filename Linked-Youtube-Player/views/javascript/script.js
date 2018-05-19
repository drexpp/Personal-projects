let player;
let video_id;
let socket;
let remotePlayedVideo = false;
let remotePausedVideo = false;

window.onload = function() {
    socket = io();
    let url = document.location.href;
    let params = url.indexOf('?room=') !== -1? url.split('?room=')[1] : -1;

    switch (params){
        case -1:
            // no room joining. loading form
            loadForm();
            break;
        default:
            // abrir loading
            $('#youtubeAPI').ready(function(){
                if (this.readyState === 'complete') {
					console.log(params);
                    createYTVideoPlayer(params);
                    socket.emit('joinRoom', params);
                }

				// cerrar loading
				socket.on('joinResult', function (response) {
					shareLink(response);
				});

				$(".form").remove();
            });

    }

    socket.on('videoPlaying', function (data) {
        remotePlayedVideo = true;
        player.playVideo();

    });
    socket.on('videoPaused', function (data) {
        remotePausedVideo = true;
        player.pauseVideo();
    });
};


function dontYouMissHome(){
    $('.home').removeClass('invisible');
}

function loadForm(){
    $('.invisible:not(".home")').toggleClass('invisible');
}

function copyValueToClipboard(element) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
}

function newRoomEventHandler() {
    socket.emit('joinRoom', video_id);

    socket.on('joinResult', function (response) {
		shareLink(response);
	});
}

function shareLink(response){
    $(".main-div").append(`
		<div class="container-fluid">
			<input class="room-link" value="${response.url}" readonly />			
			<a class="share-link" href="#">Share me!</a>
		</div>
	`);


    $('.share-link').on('click', (e)=>{
		e.preventDefault();
		copyValueToClipboard($('.room-link'))
	});

}


function processURL(){
    console.log(socket);
    let inputURL = $('#inputURL').val();

	if (inputURL.indexOf(".be/") !== -1) {
		inputURL = inputURL.split(".be/")[1];
	}

    $(".form").hide('slow');

    let parameters =`src='${inputURL}' frameborder='0' allowfullscreen`;
    let iframeElement = $(`<iframe ${parameters}></iframe>`);
    createYTVideoPlayer(inputURL);
    newRoomEventHandler();

    $(".form").remove();
    return false;
}

function createYTVideoPlayer(videoURL){
    let roomJoin = videoURL.indexOf('v=') === -1;
    if (!roomJoin){
        video_id = videoURL.split('v=')[1];
        let ampersandChar = video_id.indexOf('&');
        ampersandChar = ampersandChar!==-1?ampersandChar:video_id.length;
        video_id = video_id.substring(0,ampersandChar);
    }
    else {
        video_id = videoURL;
    }
 
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: video_id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    dontYouMissHome();
}

// autoplay video
function onPlayerReady(event) {
    // event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        if (!remotePlayedVideo) {
            socket.emit('videoPlaying', true);
        }
        else
            remotePlayedVideo = false;
    }
    else if (event.data === YT.PlayerState.PAUSED) {
        if (!remotePausedVideo) {
            socket.emit('videoPaused', true);
        }
        else
            remotePausedVideo = false;
    }
}
