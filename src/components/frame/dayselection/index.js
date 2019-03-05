// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class DaySelection extends Component {

	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
	      day: '0'
		};
	}

	//event handler for radio button selection
	handleChange(event) {
	  this.setState({
	    day: event.target.value
	  });
		this.props.changeDay(event.target.value);
	}

	// renders radio buttons
	render() {
		return (
				<div class = {style.daySel}>
					<button class={style.button} id='day0' type="button" value="0" onClick={this.handleChange}>Today</button>
	        <button class={style.button} id='day1' type="button" value="1" onClick={this.handleChange}>{this.props.daysText[1]}</button>
	        <button class={style.button} id='day2' type="button" value="2" onClick={this.handleChange}>{this.props.daysText[2]}</button>
				</div>
		);
	}
}
