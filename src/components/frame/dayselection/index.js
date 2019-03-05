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
	      day: '0',
		};
	}

	//event handler for radio button selection
	handleChange(event) {
	  this.setState({
	    day: event.target.value
	  });
		this.props.changeDay(event.target.value);

		// cycle through sibling elements of the target, changing bg-color
		for(var i=0;i<3;i++){
			event.target.parentNode.childNodes[i].style.backgroundColor = "#4E4E4E";
		}
		event.target.style.backgroundColor = "#323232";
	}

	// renders radio buttons
	render() {
		return (
				<div class = {style.daySel}>
					<button class={style.button} id={style.day0} type="button" value="0" onClick={this.handleChange}>Today</button>
	        <button class={style.button} id={style.day1} type="button" value="1" onClick={this.handleChange}>{this.props.daysText[0]}</button>
	        <button class={style.button} id={style.day2} type="button" value="2" onClick={this.handleChange}>{this.props.daysText[1]}</button>
				</div>
		);
	}
}
