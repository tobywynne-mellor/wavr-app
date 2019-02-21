//testing commit

// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class DaySelection extends Component {

	constructor(props){
		super(props);
	}

	//returns 0-2

	//call this.props.changeDay(day).bind(), day is 1-7 for day of week

	render() {
		return (
            <div>
                <p>Day Selection</p>
								<p>testing commit</p>
            </div>
		);
	}
}
