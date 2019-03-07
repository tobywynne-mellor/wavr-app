// import preact
import { h, render, Component } from 'preact';
import 'preact/devtools';
// import jquery for API calls
import $ from 'jquery';
import { isBoolean } from 'util';
import Frame from './frame';
import Loading from './loading';
import style from './style';



export default class App extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);

		this.changeLocation = this.changeLocation.bind(this);
		this.state.mswLoading = true;
		this.state.admiralLoading = true;
		this.state.delay = true;

		this.state = {
			location : {
				name : "Thurso",
				tide : "0298",
				weather : "47"
			},
			timestamp : [],
			solidRating : [],
			swell : {
				primary : {
					direction : [],
					height : [],
					period : []
				},
				secondary : {
					direction : [],
					height : [],
					period : []
				}
			},
			weather : {
				temperature : [],
				chill : [],
				iconNo : [],
				windSpeed : [],
				compassDirection : [],
				windDirection : []
			},
			tide : {
				eventType : [],
				dateTime : [],
				height : []
			}
		};
	}

	// function is passed to child component 'frame' to allow the trigger of new api call
	changeLocation(val) {

		if (val === "newquay" && this.state.location.name.toUpperCase() !== "NEWQUAY"){
			this.setState({mswLoading : true, admiralLoading : true});
			this.setState({location : { name : "Newquay", tide : "0546", weather : "1"}});
		} else if (val === "thurso" && this.state.location.name.toUpperCase() !== "THURSO"){
			this.setState({mswLoading : true, admiralLoading : true});
			this.setState({location : { name : "Thurso", tide : "0298", weather : "47"}});
		}
	}

	/*=============================================
		fetchWeatherData Function
		-> Calls magicseaweed api for weather data
		ThursoID = 47
		NewquayID = 1
	===============================================*/

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
			this.setState({mswLoading : false});

		})
		.fail((req, err) => {
			console.log('API call failed ' + err);
		});
	}

	/*=============================================
		fetchTideData Function
			-> Calls admiralty api for tide data
			ThursoID = 0298
			NewquayID = 0546
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
				this.setState({admiralLoading : false});
			})
			.fail((req, err) => {
				console.log('API call failed ' + err);
			});
		});
	}

	// Will render loading screen if data is not downloaded
	render() {
		return (
			<div class ={ style.app }>
				{this.state.delay === undefined || this.state.delay || this.state.mswLoading || this.state.admiralLoading ? (
					<Loading/>
				) : (
					<Frame data = { this.state } changeLocation = { this.changeLocation }/>
				)}
			</div>

		);
	}

	// called after render
	// fetch data for location in state
	// and trigger loading screen
	componentDidMount() {
		this.fetchTideData(this.state.location.tide);
		this.fetchWeatherData(this.state.location.weather);

		setTimeout(
			() => {
				this.setState({delay : false});
			},
			1500
		);
	}

	//called after location change
	// if location has changed in state then fetch data for that location
	// and trigger loading screen
	componentDidUpdate(prevProps, prevState) {
		if (prevState.location.name !== this.state.location.name) {
			this.fetchTideData(this.state.location.tide);
			this.fetchWeatherData(this.state.location.weather);
			this.setState({delay : true});
			setTimeout(
				() => {
					this.setState({delay : false});
				},
				1500
			);
		}
	}

	/*===============================
		parseResponse
			-> parses data from APIs and stores in state
	=================================*/

	parseResponse = (parsed_json, mode) => {

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
					"compassDirection" : [],
					"windDirection" : []
				}
			};

			//parse data into stucture
			parsed_json.forEach(point => {
				data.timestamp.push(point.timestamp);
				data.solidRating.push(point.solidRating);
				data.swell.primary.direction.push(point.swell.components.primary.direction);
				data.swell.primary.height.push(point.swell.components.primary.height);
				data.swell.primary.period.push(point.swell.components.primary.period);
				if (typeof point.swell.components.secondary === "undefined") {
					data.swell.secondary.direction.push(null);
					data.swell.secondary.height.push(null);
					data.swell.secondary.period.push(null);
				} else {
					data.swell.secondary.direction.push(point.swell.components.secondary.direction);
					data.swell.secondary.height.push(point.swell.components.secondary.height);
					data.swell.secondary.period.push(point.swell.components.secondary.period);
				}
				data.weather.temperature.push(point.condition.temperature);
				data.weather.chill.push(point.wind.chill);
				data.weather.iconNo.push(point.condition.weather);
				data.weather.windSpeed.push(point.wind.speed);
				data.weather.compassDirection.push(point.wind.compassDirection);
				data.weather.windDirection.push(point.wind.direction);
			});

			//set state
			this.setState(Object.assign(this.state, data));


		} else {
			console.log("error @parseResponse - unrecognised 'mode' argument: " + mode);
		}
	}
}
