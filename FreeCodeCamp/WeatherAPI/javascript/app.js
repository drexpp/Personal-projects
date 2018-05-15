const API_KEY = "YOUR API KEY";
var browserLocation;
var foundWeather;


$(document).ready(function(){
	browserLocation = getOwnLocation();
	//Añadimos la imagen de carga en el contenedor
    $('<img src="images/loading.gif"/>').insertAfter('.content');

});

function searchWeather(){
	var city = $(".city").val();
	$.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`, function(json){
		foundWeather = json;
		$(".name").text(`${foundWeather.name}, ${foundWeather.sys.country}`);
		$(".temperature").text(`${browserLocation.main.temp} °C`);
		$(".description").text(foundWeather.weather[0].description);

	});

	return false;
}


function getOwnLocation() {
	navigator.geolocation.getCurrentPosition((pos) => getJSON(pos));
}


function getJSON(pos){
      //Ajax calling Json
		$.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${API_KEY}&units=metric`, 
		  function(json){
     		browserLocation = json;

			$('img').fadeOut(1000, () => {
				$(".name").text(`${browserLocation.name}, ${browserLocation.sys.country}`);
				$(".temperature").text(`${browserLocation.main.temp} °C`);
				$(".description").text(browserLocation.weather[0].description);	
			});
		  });
};


function generateText(){
}

