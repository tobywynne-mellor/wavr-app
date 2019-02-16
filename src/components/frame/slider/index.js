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
		const today = new Date();
		this.state.current = today.getHours();
		this.state.value = today.getHours();
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(event) {
		this.setState({value: event.target.value});
		this.props.changeTime(this.state.value); //IMPORTANT: this sends the time selected to props
	}


	render() {
		return (
			<div class="container">
			  <hr/>
			  <h5>Slider</h5>
        <input type="range" min={this.state.current} max="23" value={this.state.value} id="slider" oninput={this.handleChange}/>
				<p>Time: <span id="time">{this.state.value}</span>:00</p>
      	<SurfRating rating = {this.props.rating[0]}/>
      </div>
		);
	}
}
