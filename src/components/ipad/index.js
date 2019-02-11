// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_ipad from '../button/style_ipad';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Ipad extends Component {
//var Ipad = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		let url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=cf17e23b1d108b29a4d738d2084baf5";
		$.ajax({
			url,
			dataType: "jsonp",
			success : this.parseResponse,
			error(req, err){ console.log('API call failed ' + err); }
		});
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	/*
	magic seaweed endpoint for newquay
	http://magicseaweed.com/api/228f31c96d7e78544234f9f4f4bd6869/forecast/?spot_id=1




	Tide data for scrabster near thurso
	change station id to 0546 for Newquay

	$(function() {
        var params = {
            // Request parameters
            "duration": "{integer}",
        };
      
        $.ajax({
            url: "https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations/0298/TidalEvents?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","6cf59ae8480d4de2be13bae105e17196");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });
	*/

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.currentCity }</div>
					<div class={ style.country }>{ this.state.currentCountry }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ style.temperature }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class={ style_ipad.container }>
					{ this.state.display ? <Button class={ style_ipad.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		let city = parsed_json['name'];
		let country = parsed_json['sys']['country'];
		let temp_c = parsed_json['main']['temp'];
		let conditions = parsed_json['weather']['0']['description'];

		// set the states for fields so they could be rendered later on
		this.setState({
			currentCity: city,
			currentCountry: country,
			temp: temp_c,
			cond : conditions
		});
	}
}
