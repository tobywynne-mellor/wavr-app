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
        // <div class = {style.daySel}>
				// 		<ul>
				// 			<li>
				// 				<label>
				// 					<input
				// 						type="radio"
				// 						value="0"
				// 						checked={this.state.day === "0"}
				// 						onChange={this.handleChange}
				// 					/>Today
				// 				</label>
				// 			</li>
				// 			<li>
				// 				<label>
				// 					<input
				// 						type="radio"
				// 						value="1"
				// 						checked={this.state.day === "1"}
				// 						onChange={this.handleChange}
				// 					/>{this.props.daysText[0]}
				// 				</label>
				// 			</li>
				// 			<li>
				// 				<label>
				// 					<input
				// 						type="radio"
				// 						value="2"
				// 						checked={this.state.day === "2"}
				// 						onChange={this.handleChange}
				// 					/>{this.props.daysText[1]}
				// 				</label>
				// 			</li>
				// 		</ul>
        // </div>
				<div class = {style.daySel}>
					<button class={style.button} id='day0' type="button" value="0" onClick={this.handleChange}>Today</button>
	        <button class={style.button} id='day1' type="button" value="1" onClick={this.handleChange}>{this.props.daysText[0]}</button>
	        <button class={style.button} id='day2' type="button" value="2" onClick={this.handleChange}>{this.props.daysText[1]}</button>
				</div>

		);
	}
}
