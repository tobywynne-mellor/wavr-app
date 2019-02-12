// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import { isBoolean } from 'util';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);

		//Location state
			// "name" : "Newquay",
			// "tide" : "0546",
			// "weather" : "1"

		this.state.location = {
			"name" : "Thurso",
			"tide" : "0298",
			"weather" : "47"
		};

		this.state.tide = {
			"eventType" : [],
			"dateTime" : [],
			"height" : []
		};

		this.state.weather = {
			"timestamp" : [],
			"solidRating" : [],
			"swell" : {
				"direction" : [],
				"height" : [],
				"period" : []
				// "isIncoming" : true -> instead of mini compasses we could say onshore/offshore
			},
			"weather" : {
				"temperature" : [],
				"chill" : [],
				"iconNo" : [],
				"windSpeed" : [],
				"windDirection" : []
			}
		};
	}

	/*
		fetchWeatherData Function
		-> Calls magicseaweed api for weather data
		ThursoID = 47
		NewquayID = 1

		Schema of returned data (useful data only)
		[0 - 39] typically 3 hour intervals
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
			url,
			dataType: "jsonp"
		})
		.done((data) => {
			// console.log("fetchWeatherData success");
			this.parseResponse(data, "weather");
		})
		.fail((req, err) => {
			console.log('API call failed ' + err);
		});

		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	/*=============================================
		fetchTideData Function
			-> Calls admiralty api for tide data
			ThursoID = 0298
			NewquayID = 0546

			Schema of returned data
			[] (4 readings per day 2 high, 2 low)
				EventType (HighWater/LowWater)
				DateTime
				Height (to be rounded)
	===============================================*/

	fetchTideData = (id) => {
		$(() => {
			let params = {
				// Request parameters
				"duration": "3" //in days range from 1 to 7
			};
			$.ajax({
				url: "https://cors-anywhere.herokuapp.com/https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations/"+id+"/TidalEvents?" + $.param(params),
				beforeSend(xhrObj){
					// Request headers
					xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","6cf59ae8480d4de2be13bae105e17196");
				},
				type: "GET",
				// Request body
				data: "{body}"
			})
			.done((data) => {
				// console.log("fetchTideData success");
				this.parseResponse(data, "tide");
			})
			.fail((req, err) => {
				console.log('API call failed ' + err);
			});
		});

		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.location.name }</div>
					<div class={ style.conditions }>cold</div>
					<span class={ style.temperature }>{this.state.weather.temperature}</span>
				</div>
				<div class={ style.details }></div>
				
			</div>
			
		);
	}

	componentDidMount() {
		// this.fetchTideData(this.state.location.tide);
		this.fetchWeatherData(this.state.location.weather);
	}
	/*===============================
		parseResponse
			-> parses data from APIs and stores in state
	=================================*/

	parseResponse = (parsed_json, mode) => {
		console.log("parseResponse called");
		console.log(parsed_json);

		if (mode === "tide"){

			let data = {
				"eventType" : [],
				"dateTime" : [],
				"height" : []
			};

			parsed_json.forEach(point => {
				data.eventType.push(point.EventType);
				data.dateTime.push(point.DateTime);
				data.height.push(Math.round(point.Height*10)/10);
			});

			this.setState(Object.assign(this.state.tide, data));

			
		} else if (mode === "weather") {

			//create data structure
			let data = {
				"timestamp" : [],
				"solidRating" : [],
				"swell" : {
					"primary" : {
						"direction" : [],
						"height" : [],
						"period" : []
					},
					"secondary" : {
						"direction" : [],
						"height" : [],
						"period" : []
					}
				},
				"weather" : {
					"temperature" : [],
					"chill" : [],
					"iconNo" : [],
					"windSpeed" : [],
					"windDirection" : []
				}
			};

			//parse data into stucture
			parsed_json.forEach(point => {
				data.timestamp.push(point.localtimestamp);
				data.solidRating.push(point.solidRating);
				data.swell.primary.direction.push(point.swell.components.primary.direction);
				data.swell.primary.height.push(point.swell.components.primary.height);
				data.swell.primary.period.push(point.swell.components.primary.period);
				data.swell.secondary.direction.push(point.swell.components.secondary.direction);
				data.swell.secondary.height.push(point.swell.components.secondary.height);
				data.swell.secondary.period.push(point.swell.components.secondary.period);
				data.weather.temperature.push(point.condition.temperature);
				data.weather.chill.push(point.wind.chill);
				data.weather.iconNo.push(point.condition.weather);
				data.weather.windSpeed.push(point.wind.speed);
				data.weather.windDirection.push(point.wind.direction);
			});

			//set state
			this.setState(Object.assign(this.state.weather, data));


		} else {
			console.log("error @parseResponse - unrecognised 'mode' argument: " + mode);
		}
	}
}