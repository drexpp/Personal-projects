const API_KEY = "YOUR API KEY";
var browserLocation;
var foundWeather;


$(document).ready(() => { browserLocation = getOwnLocation();

	//Añadimos la imagen de carga en el contenedor
        $('<img id="loading-img" src="images/loading.gif"/>').insertAfter('.content');
		$("input, button").prop('disabled', true);

});

function searchWeather(){
	var city = $(".city").val();
	$.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`, 
		(json) => {
			foundWeather = json;
			$(".name").text(`${foundWeather.name}, ${foundWeather.sys.country}`);
			$(".temperature").text(`${browserLocation.main.temp} °C`);
			$("img").remove();
			const img =	$("<img id='weather-icon' src=''/>");
			img.attr("src",`http://openweathermap.org/img/w/${foundWeather.weather[0].icon}.png`);
			img.appendTo("#description");
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
				
				$('#loading-img').fadeOut(1000, () => {	
					$("input, button").prop('disabled', false);
					$(".name").text(`${browserLocation.name}, ${browserLocation.sys.country}`);
					$(".temperature").text(`${browserLocation.main.temp} °C`);
					const img =	$("<img id='weather-icon' src=''/>");
					img.attr("src",`http://openweathermap.org/img/w/${browserLocation.weather[0].icon}.png`);
					img.appendTo("#description");
			});
		  });
};
