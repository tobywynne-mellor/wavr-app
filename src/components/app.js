// import preact
import { h, render, Component } from 'preact';
import 'preact/devtools';
// import jquery for API calls
import $ from 'jquery';
import { isBoolean } from 'util';
import Frame from './frame';
import Loading from './loading';



export default class App extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);

		this.changeLocation = this.changeLocation.bind(this);
		this.state.mswLoading = true;
		this.state.admiralLoading = true;

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
				windDirection : []
			},
			tide : {
				eventType : [],
				dateTime : [],
				height : []
			}
		};
	}

	changeLocation(val) {

		this.setState({mswLoading : true, admiralLoading : true});

		let newquay = {
			location : {
				name : "Newquay",
				tide : "0546",
				weather : "1"
			}
		};
		let thurso =  {
			location : {
				name : "Thurso",
				tide : "0298",
				weather : "47"
			}
		};

		if (val === "newquay" && this.state.location.name !== "Newquay"){
			this.setState(Object.assign(this.state.location, newquay));
		} else if (val === "thurso" && this.state.location.name !== "Thurso"){
			this.setState(Object.assign(this.state.location, thurso));
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
			console.log(data);

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
			<div>
				{!this.state.mswLoading && !this.state.admiralLoading ? (
					<Frame data = { this.state } changeLocation = { this.changeLocation }/>
				) : (
					<Loading/>

				)}
			</div>

		);
	}

	//called after render
	componentDidMount() {
		console.log("Fetching data from API...");
		this.fetchTideData(this.state.location.tide);
		this.fetchWeatherData(this.state.location.weather);
	}

	//called after location change
	componentDidUpdate(prevProps, prevState) {
		if (prevState.location.name !== this.state.location.name) {
			this.fetchTideData(this.state.location.tide);
			this.fetchWeatherData(this.state.location.weather);
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
				data.weather.windDirection.push(point.wind.direction);
			});

			//set state
			this.setState(Object.assign(this.state, data));


		} else {
			console.log("error @parseResponse - unrecognised 'mode' argument: " + mode);
		}
	}
}
