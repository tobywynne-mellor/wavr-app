// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	/*
		fetchWeatherData Function
		-> Calls magicseaweed api for weather data
		ThursoID = 47
		NewquayID = 1

		Schema of returned data (useful data only)
		Array[0 - 39] typically 3 hour intervals
			localtimestamp (needs to be converted from UNIX format)
			solidRating (quality of surf rating)
			
			SWELL
			swell.components[].direction (could use compassDirection instead)
			swell.components[].height
			swell.components[].period
			swell.components[].isIncoming (True if swell heading towards beach otherwise false and wont impact surf size) display onshore/offshore instead of compass??
			
			WEATHER
			condition.temperature
			wind.chill (feels like temperature based on wind and air temp)
			condition.weather (weather icon number, http://cdnimages.magicseaweed.com/30×30/{{ICON NUMBER}}.png.)
			wind.speed (mph)
			wind.direction (can use compassDirection)
	*/
	fetchWeatherData = (id) => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		let url = "http://magicseaweed.com/api/228f31c96d7e78544234f9f4f4bd6869/forecast/?spot_id=" + id;
		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		});
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	/*
		fetchTideData Function
			-> Calls admiralty api for tide data
			ThursoID = 0298
			NewquayID = 0546

			Schema of returned data

	*/
	fetchTideData = (id) => {
		$(() => {
			const params = {
				// Request parameters
				//TODO : decide duration
				"duration": "{integer}"
			};
		  
			$.ajax({
				url: "https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations/" + id + "/TidalEvents?" + $.param(params),
				beforeSend: function(xhrObj){
					// Request headers
					xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","6cf59ae8480d4de2be13bae105e17196");
				},
				type: "GET",
				// Request body
				data: "{body}"
			})
			.done((data) => {
				alert("success");
			})
			.fail(() => {
				alert("error");
			});
		});
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData(1) }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		console.log(parsed_json);
		// let location = parsed_json['name'];
		// let temp_c = parsed_json['main']['temp'];
		// let conditions = parsed_json['weather']['0']['description'];
		
		// // set states for fields so they could be rendered later on
		// this.setState({
		// 	locate: location,
		// 	temp: temp_c,
		// 	cond : conditions
		// });
	}
}
