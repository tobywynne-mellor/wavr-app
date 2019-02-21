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
	      day: ''
	  };
	}


	convertTimestamp(str) {
		let date = new Date(parseInt(str,10)*1000);
		return date.getHours();
	}

	handleChange(event) {
	  this.setState({
	    day: event.target.value
	  });
	}

	//returns 0-2

	//call this.props.changeDay(day).bind(), day is 1-7 for day of week

	render() {
		return (
        <div>
						<ul>
							<li>
								<label>
									<input
										type="radio"
										value="0"
										checked={this.state.day === "0"}
										onChange={this.handleChange}
									/>Today
								</label>
							</li>
							<li>
								<label>
									<input
										type="radio"
										value="1"
										checked={this.state.day === "1"}
										onChange={this.handleChange}
									/>Tomorrow
								</label>
							</li>
							<li>
								<label>
									<input
										type="radio"
										value="2"
										checked={this.state.day === "2"}
										onChange={this.handleChange}
									/>Next Day
								</label>
							</li>
						</ul>
        </div>
		);
	}
}
