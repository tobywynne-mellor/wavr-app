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
                <Conditions temperature = {this.props.weather.temperature[this.props.index]} chill = { this.props.weather.chill[this.props.index] } iconNo = { this.props.weather.iconNo[this.props.index] } newIconNo = { this.iconNumberProcessed()}/>
                <Wind direction = { this.props.weather.windDirection[this.props.index] }  compass = { this.props.weather.compassDirection[this.props.index] } speed = { this.props.weather.windSpeed[this.props.index] } />
            </div>
		);
	}

	iconNumberProcessed(){
		var input = this.props.weather.iconNo[this.props.index];
		if(input == 1){
			return 1;//sun
		}
		else if((input > 1 && input < 10) || input == 34 || input == 35 || input == 37){
			return 2;//sun + cloud
		}
		else if(input == 11 || input == 12 || input == 19 || input == 20){
			return 3;//white cloud
		}
		else if((input > 12 && input < 18 ) || input == 33 || input == 38){
			return 4;//grey cloud
		}
		else if(input == 20 || input == 21){
			return 5;//rain
		}
		else if((input > 22 && input < 30) && input !== 28){
			return 6;//heavy rain
		}
		else if(input == 18 || input == 28 || input == 36){
			return 7;//thunder
		}
		else if(input == 10){
			return 8;//moon
		}
		else{
			return 9;//unkown/error (possibly fog)
		}
	}
}
