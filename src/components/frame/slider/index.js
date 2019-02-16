// import preact
import { h, render, Component } from 'preact';
import style from './style.less';
import { isBoolean } from 'util';
import Stars from '../stars';
import SurfRating from '../surfrating';

export default class Slider extends Component {

	constructor(props){
		super(props);
		//boring stuff here
		this.state.currentTime = new Date().getHours();
		this.handleChange = this.handleChange.bind(this);

    //converting timestamp to actual date
		var date = new Date(this.props.timeSt[0]);
		this.state.timestamp = date.toDateString();
	}


	handleChange(event) {
		this.props.changeTime(event.target.value); //IMPORTANT: this sends the time selected to props
	}


	render() {
		return (
			<div class="container">
			  <hr/>
			  <h5>Slider</h5>
				<h3>Timestamp from API: { this.props.timeSt[0] }</h3>
				<h3>Timestamp converted: { this.state.timestamp }</h3>
        <input type="range" min={this.state.currentTime} max="23" value={this.props.time} id="slider" oninput={this.handleChange}/>
				<p>Time: <span id="time">{this.props.time}</span>:00</p>
      	<SurfRating rating = {this.props.rating[0]}/>
      </div>
		);
	}
}
