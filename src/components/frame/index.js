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

		//Initilise time and day to current time and day
		const today = new Date();
		this.state.time = today.getHours(); // maybe round to nearest swell reading?
		this.state.day = today.getDay();

		this.changeTime = this.changeTime.bind(this);
		this.changeDay = this.changeDay.bind(this);
	}

	changeTime(val) {
		this.setState({time : val});
	}

	changeDay(val) {
		this.setState({day : val});
	}


	render() {
		return (
            <div>
                <Menu name = { this.props.data.location.name }/>
								<h1>Time: { this.state.time }</h1>
                <h1>Day: { this.state.day }/7</h1>
								<Swell locationName = { this.props.data.location.name } swell = { this.props.data.swell } time = { this.state.time } day = { this.state.day }/>
								<Weather weather = { this.props.data.weather } />
								<Tide tide = { this.props.data.tide } time = { this.state.time } day = { this.state.day }/>
                <Slider changeTime = { this.changeTime } time = { this.state.time } rating = { this.props.data.solidRating } />
								<DaySelection changeDay = { this.changeDay } day = { this.state.day } />
            </div>
		);
	}
}
