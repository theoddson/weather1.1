$(function() {

		//getting zip code that is typed into zip field
		$('.enter-button').on('click',function(){
			var zipCode = $('.zip-field').val();


			if(zipCode.length<5 || zipCode.length>5){
				$('.error').slidedown();

			}else{
				getZip(zipCode);
				$('#zip-screen').hide();
				$('.weather-screen').show();
			}


		});
		$('.zip-field').on ('keypress', function (e) {
				if(e.keyCode == 13) {
             var zipCode = $('.zip-field').val();
            getZip(zipCode);
						$('#zip-screen').hide();
						$('.weather-screen').show();

        }
    });



	function getZip(zip){
			//setting my api id to a variable
			var userId = 'fb5379470dcd4e87';
			var massage = 'hi'
			//Getting the weather data from wunderground account with ajax
			$.ajax({
	           	url: "http://api.wunderground.com/api/"+userId+"/forecast10day/geolookup/conditions/q/"+zip+".json",
	            //url: "http://api.wunderground.com/api/fb5379470dcd4e87/forecast10day/geolookup/conditions/q/19144.json",
							dataType: 'jsonp',
	            type: 'GET',
	            success: function (tiempo) {





								//get the weather,temperature,location,wind, humidity, and
								//forcast of current day
								var location = tiempo['current_observation']['display_location']['full'];
								var temp_f = tiempo['current_observation']['temp_f'];
								//Temp rounds the decimal value of temp_f
								var temp = Math.ceil(temp_f);
								var feels = tiempo['current_observation']['feelslike_f'];
								var weather = tiempo['current_observation']['weather'];
								var current_weekday = tiempo['forecast']['simpleforecast']['forecastday'][0]['date']['weekday'];
								var current_m = tiempo['forecast']['simpleforecast']['forecastday'][0]['date']['monthname'];
								var current_d = tiempo['forecast']['simpleforecast']['forecastday'][0]['date']['day'];
								var current_y = tiempo['forecast']['simpleforecast']['forecastday'][0]['date']['year'];

								$('.temp_f').append(temp+'&deg;'+'F');
								$('.weather').append(weather);
	              $('.location').append(location);
								$('.date').append(current_m+' '+current_d+', '+current_y);
								$('.day').append(current_weekday);

								switch(weather){
									case ('Overcast' || 'cloudy' || 'mostly cloudy' || 'scatted-clouds' || 'partly cloudy'):
										$('.icon').append('<img src="cloud-icon.png" />');
										break;
									case ('Clear' || 'Sunny'):
										$('.icon').append('<img src="sun.png" />');
										break;
									case ('Rain' || 'showers' || 'thunderstom' || 'thunderstorms'):
										$('.icon').append('<img src="rain-icon.png" />');
										break;
								}
								//changes background color depending on the temperature
								if(temp > 0 && temp < 40){
										$('.weather-screen').addClass('cold');
									}
								if(temp > 40 && temp < 60){
										$('.weather-screen').addClass('chilly');
									}
								if(temp > 60 && temp < 80){
										$('.weather-screen').addClass('warm');
									}
								if(temp > 80 && temp < 100){
										$('.weather-screen').addClass('hot');
									}

								//for the seven day forecast
								var daysOfweek = tiempo.forecast.simpleforecast.forecastday;
								for(var i=1; i<6;i++){
									var day = daysOfweek[i]

									var weekday = day.date.weekday
									//convert weekdays to abreviations
									var abrv =""

												switch(weekday){
													case "Thursday":
														abrv = "T"
														break;
													case "Friday":
														abrv = "F"
														break;
													case "Saturday":
														abrv = "S"
														break;
													case "Sunday":
														abrv = "S"
														break;
													case "Monday":
														abrv = "M"
														break;
													case "Tuesday":
														abrv = "T"
														break;
													case "Wednesday":
														abrv = "W"
														break;
												}



									$('#five-day').append('<div class="weekday">'
										+'<p class="weekday-name">'+abrv+'</p>'
										+'<div class="weekday-icon"></div>'
										+'<p class="weekday-high">'+day.high.fahrenheit+'</p>'
										+'<p class="weekday-low">'+day.low.fahrenheit+'</p>'+'</div>');

								}


	            },

							error : function(message){
								alert(message);
							}

	        });
	}

});
