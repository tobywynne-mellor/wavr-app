// import preact
import { h, render, Component } from 'preact';
import 'preact/devtools';
import Frame from './frame';
import Loading from './loading';
import Error from './error';
import style from './style';



export default class App extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);

		this.changeLocation = this.changeLocation.bind(this);

		this.state = {
			mswLoading: true,
			admiralLoading: true,
			delay: true,
			failed: false,
			location: {
				name: "Thurso",
				tide: "0298",
				weather: "47"
			},
			timestamp: [],
			solidRating: [],
			swell: {
				primary: {
					direction: [],
					height: [],
					period: []
				},
				secondary: {
					direction: [],
					height: [],
					period: []
				}
			},
			weather: {
				temperature: [],
				chill: [],
				iconNo: [],
				windSpeed: [],
				compassDirection: [],
				windDirection: []
			},
			tide: {
				eventType: [],
				dateTime: [],
				height: []
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
		-> Populates state with dummy weather data
	===============================================*/

	fetchWeatherData = () => {
		const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
		const data = {
			timestamp: [],
			solidRating: [],
			swell: {
				primary: { direction: [], height: [], period: [] },
				secondary: { direction: [], height: [], period: [] }
			},
			weather: {
				temperature: [],
				chill: [],
				iconNo: [],
				windSpeed: [],
				compassDirection: [],
				windDirection: []
			}
		};

		const base = Date.now();

		for (let i = 0; i < 24; i++) {
			data.timestamp.push(new Date(base + (i * 3 * 60 * 60 * 1000)).toISOString());
			data.solidRating.push(2 + (i % 3));

			data.swell.primary.direction.push((180 + (i * 7)) % 360);
			data.swell.primary.height.push(Math.round((1.2 + (i % 4) * 0.3) * 10) / 10);
			data.swell.primary.period.push(8 + (i % 3));

			data.swell.secondary.direction.push((210 + (i * 5)) % 360);
			data.swell.secondary.height.push(Math.round((0.4 + (i % 2) * 0.2) * 10) / 10);
			data.swell.secondary.period.push(9 + (i % 2));

			data.weather.temperature.push(14 + (i % 6));
			data.weather.chill.push(12 + (i % 6));
			data.weather.iconNo.push([1, 2, 3, 4, 20][i % 5]);
			data.weather.windSpeed.push(8 + (i % 5));
			data.weather.compassDirection.push(directions[i % directions.length]);
			data.weather.windDirection.push((i * 15) % 360);
		}

		this.setState({
			...data,
			mswLoading: false,
			failed: false
		});
	}

	/*=============================================
		fetchTideData Function
			-> Populates state with dummy tide data
	===============================================*/

	fetchTideData = () => {
		const tideData = {
			eventType: [
				"LowWater", "HighWater", "LowWater", "HighWater",
				"LowWater", "HighWater", "LowWater", "HighWater",
				"LowWater", "HighWater", "LowWater", "HighWater"
			],
			dateTime: [
				"2025-12-21T01:05:00Z",
				"2025-12-21T07:30:00Z",
				"2025-12-21T13:15:00Z",
				"2025-12-21T19:40:00Z",
				"2025-12-22T02:10:00Z",
				"2025-12-22T08:00:00Z",
				"2025-12-22T14:05:00Z",
				"2025-12-22T20:10:00Z",
				"2025-12-23T03:00:00Z",
				"2025-12-23T09:05:00Z",
				"2025-12-23T15:00:00Z",
				"2025-12-23T21:10:00Z"
			],
			height: [0.8, 3.4, 1.1, 3.2, 0.9, 3.5, 1.2, 3.3, 1.0, 3.6, 1.3, 3.4]
		};

		this.setState({
			tide: tideData,
			admiralLoading: false,
			failed: false
		});
	}

	// Will render loading screen if data is not downloaded
	render() {
		return (
			<div class ={ style.app }>
				{this.state.delay === undefined || this.state.delay || this.state.mswLoading || this.state.admiralLoading ? (
					this.state.failed ? (<Error/>) : (<Loading/>)
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
		this.fetchTideData();
		this.fetchWeatherData();

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
			this.fetchTideData();
			this.fetchWeatherData();
			this.setState({delay : true});
			setTimeout(
				() => {
					this.setState({delay : false});
				},
				1500
			);
		}
	}

}
