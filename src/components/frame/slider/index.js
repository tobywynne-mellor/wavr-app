/* eslint-disable no-mixed-spaces-and-tabs */
// import preact
import { h, render, Component } from 'preact';
import style from './style.less';
import { isBoolean } from 'util';
import Stars from '../stars';
import SurfRating from '../surfrating';

export default class Slider extends Component {

	constructor(props){
		super(props);
		this.state.currentTime = new Date().getHours();
		this.handleChange = this.handleChange.bind(this);
	}

	//TODO change interval to match hours of timestamps returns value 0-7
	// round current time on load to hours matching data

	handleChange(event) {
		this.props.changeTime(event.target.value); //IMPORTANT: this sends the time selected to props
	}


	render() {
		return (
			<div class="container">
			  <hr/>
			  <h5>Slider</h5>
				<h3>Timestamp from API: { this.props.timeSt }</h3>
				<h3>Timestamp converted: { this.convertTimestamp(this.props.timeSt) }</h3>
        <input type="range" min="0" max="24" value={this.props.time} id="slider" oninput={this.handleChange}/>
				<p>Time: <span id="time">{this.props.time}</span>:00</p>
      	<SurfRating rating = {this.props.rating[0]}/>
      </div>
		);
	}

	componentDidMount(){
		// this.setState({timestamp : date.toDateString()});
	}

	convertTimestamp(str) {
		let date = new Date(parseInt(str,10)*1000);
		return date.getHours();
	}

}
