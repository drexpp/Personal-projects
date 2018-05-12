$(document).ready(function(){
	let browserLocation;

	browserLocation = navigator.geolocation.getCurrentPosition((pos) => browserLocation = pos );
});
