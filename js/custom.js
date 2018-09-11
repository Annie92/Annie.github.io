	
	

	$('#slider-partners, #slider-videos').slick({
		arrows: true,
		dots: false,
		speed: 800,
		touchMove: true,
		autoplay: true,		
		swipeToSlide: true,		
		centerMode: true,
		centerPadding: '0',
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplaySpeed: 35000,
		prevArrow: '<button type="button" class="slick-prev pull-left"><img src="images/slider-left-arrow.png" class="img-responsive" alt="left-arrow"/></button>',
		nextArrow: '<button type="button" class="slick-next pull-right"><img src="images/slider-right-arrow.png" class="img-responsive" alt="right-arrow"/></button>',
		responsive: [	{
			breakpoint: 992,
			settings: {				
				slidesToShow: 5
			}
		},
		{	breakpoint: 700,
			settings: {				
				slidesToShow: 3
			}
		},
		{	breakpoint: 480,
				settings: {					
					slidesToShow: 2
				}
		},
		{	breakpoint: 380,
				settings: {					
					slidesToShow: 1
				}
		}
		]
	}); 
	
	
	$('#slider-welcome').slick({
		arrows: false,
		dots: true,
		speed: 800,
		touchMove: true,
		autoplay: true,		
		swipeToSlide: true,		
		centerMode: true,
		centerPadding: '0',
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed: 3000,
	}); 
$(document).ready(function($){
		
		
		$('.news-items').paginathing({
			perPage: 5, // show item per page
			limitPagination: true, // false or number. Limiting 
			prevNext: true, // enable previous and next button
			firstLast: false, // enable first and last buttonyour pagination number.
			prevText: '&LT;', // Previous button text
			nextText: '&GT;', // Next button text pages number, to work properly limitPagination must be true 
			containerClass: 'news-panel', // extend default container class
			ulClass: 'pagination', // extend default ul class
			liClass: 'page', // extend li class
			pageNumbers: true // current page number of total
		}); 
		
		var interval = setInterval(function() {
			var momentNow = moment();
			$('.date-time .date').html(momentNow.format('dddd'+', '+'DD MMMM'+' .') );
			$('.date-time .time').html(momentNow.format('hh:mm:ss'));
		}, 100);
		
		
		function getWeather(callback) {
			var weather = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Pune&units=metric&cnt=3&APPID=914ad79bbe17d88912df71f8f46180b3';
			jQuery.ajax({
			  dataType: "json",
			  url: weather,
			  success: callback
			});
		}		
		
		// get weather data:
		getWeather(function (data) {	
				var minArr = [];
				var maxArr = [];
				var descArr = [];
				var dateArr = [];
				var iconArr = [];
				//console.log('JSON.stringify(data):'+JSON.stringify(data));
				for (var i = 0; i < data.list.length; i++) {
					minArr.push(data.list[i].temp.min);
					maxArr.push(data.list[i].temp.max);
					descArr.push(data.list[i].weather[0].description);
					iconArr.push(data.list[i].weather[0].icon);
					
					var utcValue = data.list[i].dt;					
					//get value of UTC and convert to local timezone  
					var localTime  = moment.unix(utcValue).toDate();
					localTime = moment(localTime).format('dddd');					
					dateArr.push(localTime);
				}				
				
				var textMin = $(".weather-reports .weather-report.min");
				var textMax = $(".weather-reports .weather-report.max");					
				var textDesc = $(".weather-reports .weather-report.desc");					
				var textDay = $('.weather-reports .weather-report.day'); 				
				var srcIcon = $('.weather-reports .weather-report.image'); 				
				
				$.each( minArr, function( i, val ) {
					textMin.eq(i).text(val);
				});
				$.each( maxArr, function( i, val ) {
					textMax.eq(i).text(val);
				});
				$.each( descArr, function( i, val ) {
					textDesc.eq(i).text(val);
				});
				$.each( dateArr, function( i, val ) {
					textDay.eq(i).text(val);
				});
				$.each( iconArr, function( i, val ) {
					srcIcon.eq(i).attr('src',"http://openweathermap.org/img/w/" + val + ".png");
				});
		});
});
