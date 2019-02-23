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

	handleChange(event) {
		this.props.changeTime(event.target.value); //IMPORTANT: this sends the time selected to props
	}


	render() {
		return (
			<div class="container">
				<hr/>
				<h5 class = { style.fontColour } >Slider</h5>
        <input type="range" min="0" max="21" value={this.props.time} step = "3" id="slider" oninput={this.handleChange}/>
				<p>Time: {this.props.timeText}</p>
      	<SurfRating rating = {this.props.rating}/>
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
