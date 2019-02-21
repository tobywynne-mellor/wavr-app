// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Menu from './menu';
import Swell from './swell';
import Weather from './weather';
import Tide from './tide';
import Slider from './slider';
import DaySelection from './dayselection';


export default class Frame extends Component {

	constructor(props){
		super(props);

		const today = new Date();
		
		//day : 0, 1 or 2
		//time : 0, 3, 6, 9, 12, 15, 18, 21

		this.state = {
			time : this.roundDown(today.getHours(), 3),
			day : 0,
			index : Math.round(this.calcIndex(this.roundDown(today.getHours(), 3), 0))
		};

		this.calcIndex = this.calcIndex.bind(this);
		this.getTime = this.getTime.bind(this);
		this.getDay = this.getDay.bind(this);
		this.changeTime = this.changeTime.bind(this);
		this.changeDay = this.changeDay.bind(this);
		this.roundDown = this.roundDown.bind(this);
	}

	changeTime(val) {
		this.setState({time : val, index : this.calcIndex(val, this.state.day)});
	}

	changeDay(val) {
		this.setState({day : val, index : this.calcIndex(this.state.time,val)});
	}

	//Returns textual version of time
	getTime() {
		let next = parseInt(this.state.time,10) + 3;
		return this.state.time + ":00 - " + next + ":00";
	}


	getDays() {
		let today = new Date().getDay();
		return [this.getDay(today+1), this.getDay(today+2)];
	}

	//returns textual version of day
	getDay(day) {
		switch (day) {
			case 0:
				return "Sunday";
			case 1:
				return "Monday";
			case 2:
				return "Tuesday";
			case 3:
				return "Wednesday";
			case 4:
				return "Thursday";
			case 5:
				return "Friday";
			case 6:
				return "Saturday";
			case 7:
				return "Sunday";
			case 8:
				return "Monday";
			default:
				console.log("ERROR\nthis.state.day: " + this.state.day + "\nday: " + day);
				break;
		}
	}

	//rounds a number down to the nearest multiple
	roundDown (n, m) {
		return n >= 0 ? (n / m) * m : ((n - m + 1) / m) * m;
	}

	//returns the index where data can before for current day and time
	calcIndex(time, day) {
		return Math.round(day*12 + (time/3));
	}

	render() {
		return (
            <div class = { style.grid }>
                <Menu name = { this.props.data.location.name }/>
								<Swell locationName = { this.props.data.location.name } swell = { this.props.data.swell } index = {this.state.index}/>
								<Weather weather = { this.props.data.weather } index = { this.state.index } />
								<Tide tide = { this.props.data.tide } day = { this.state.day }/>
                <Slider changeTime = { this.changeTime } time = { this.state.time } timeText = {this.getTime()} rating = { this.props.data.solidRating[this.state.index] } timeSt= { this.props.data.timestamp[this.state.index] }/>
								<DaySelection changeDay = { this.changeDay } day = { this.state.day } daysText = { this.getDays() }/>
            </div>
		);
	}
}
