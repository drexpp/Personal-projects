const API_KEY = "YOUR API KEY";
var browserLocation;
var foundWeather;


$(document).ready(() => { browserLocation = getOwnLocation();
	//Añadimos la imagen de carga en el contenedor
        $('<img src="images/loading.gif"/>').insertAfter('.content');
});

function searchWeather(){
	var city = $(".city").val();
	$.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`, (json) => {
		foundWeather = json;
		$(".name").text(`${foundWeather.name}, ${foundWeather.sys.country}`);
		$(".temperature").text(`${browserLocation.main.temp} °C`);
		$(".description").text(foundWeather.weather[0].description);
	});
	return false;
}

function getOwnLocation() {
	navigator.geolocation.getCurrentPosition((position) => getJSON(position));
}

function getJSON(position){
      //Ajax calling Json
		$.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`, 
		  (json) => {
     			browserLocation = json;
			$('img').fadeOut(1000, () => {
				$(".name").text(`${browserLocation.name}, ${browserLocation.sys.country}`);
				$(".temperature").text(`${browserLocation.main.temp} °C`);
				$(".description").text(browserLocation.weather[0].description);	
			});
		  });
};
