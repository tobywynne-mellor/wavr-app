// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Stars from '../stars';
import { faDivide } from '@fortawesome/free-solid-svg-icons';

export default class DaySelection extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			day: '0'
		};
	}

	//event handler for button selection
	handleChange(event) {

		//if a button is clicked, change the selected day to the value of that button
		if (event.target.value == 0 || event.target.value == 1 || event.target.value == 2) {

			this.setState({
				day: event.target.value
			});

			this.props.changeDay(event.target.value);
			// cycle through all of the buttons, changing color
			for (let i = 0; i < 3; i++) {
				event.target.parentNode.childNodes[i].style.backgroundColor = "#4E4E4E";
			}
			//change the color of the target button to the background color
			event.target.style.backgroundColor = "#323232";
		}
		else {
			return;
		}
	}


	render() {
		return (
			//rednder 3 buttons for day selection
			<div class={style.daySel}>
				<button class={style.button} id={style.day0} type="button" value="0" onClick={this.handleChange}>TODAY<br /><Stars stars={this.props.avgRatings[0]} /></button>
				<button class={style.button} id={style.day1} type="button" value="1" onClick={this.handleChange}>{this.props.daysText[1].substring(0,3).toUpperCase()}<br /><Stars stars={this.props.avgRatings[1]} /></button>
				<button class={style.button} id={style.day2} type="button" value="2" onClick={this.handleChange}>{this.props.daysText[2].substring(0,3).toUpperCase()} <br /><Stars stars={this.props.avgRatings[2]} /></button>
			</div>

		);
	}
}
