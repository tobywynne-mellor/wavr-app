// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Conditions from  './conditions';
import Wind from  './wind';
import Title from '../title';

export default class Weather extends Component {

	constructor(props){
		super(props);

        //e.g.
        // this.props.weather = {
        // 		"temperature" : [],
		//      "chill" : [],
		//      "iconNo" : [],
		//      "windSpeed" : [],
		//      "windDirection" : []
        // 	}

	}

	render() {
		return (
            <div class = { style.weather }>
                <Title text = "Weather"/>
                <Conditions temperature = {this.props.weather.temperature[this.props.index]} chill = { this.props.weather.chill[this.props.index] } iconNo = { this.props.weather.iconNo[this.props.index] }/>
                <Wind direction = { this.props.weather.windDirection[this.props.index] } speed = { this.props.weather.windSpeed[this.props.index] } />
            </div>
		);
	}
}
